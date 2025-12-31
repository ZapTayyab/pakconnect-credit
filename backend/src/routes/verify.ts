import express from 'express';
import multer from 'multer';
import { parse } from 'csv-parse/sync';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Applicant from '../models/Applicant';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

function extractTxnFeatures(csvString: string) {
  try {
    const records: any[] = parse(csvString, { columns: true, skip_empty_lines: true });
    const amounts = records.map((r: any) => parseFloat(r.amount || 0)).filter((n: number) => !isNaN(n));
    const total = amounts.reduce((a: number, b: number) => a + b, 0);
    const avg = amounts.length ? total / amounts.length : 0;
    const count = amounts.length;
    const std = amounts.length
      ? Math.sqrt(amounts.map((a: number) => Math.pow(a - avg, 2)).reduce((s: number, x: number) => s + x, 0) / amounts.length)
      : 0;
    return { txn_count: count, txn_total: total, txn_avg: avg, txn_std: std };
  } catch (err) {
    return {};
  }
}

/**
 * POST /api/verify
 * Accepts multipart/form-data or JSON with fields:
 * - name, phone, email, income, expenses, dependents
 * - transactions (optional CSV file)
 */
router.post('/verify', upload.single('transactions'), async (req, res) => {
  try {
    const { name, phone, email, income, expenses, dependents } = (req.body || {});
    let features: any = {
      income: Number(income || 0),
      expenses: Number(expenses || 0),
      dependents: Number(dependents || 0)
    };

    let rawCsv = '';
    if (req.file) {
      rawCsv = req.file.buffer.toString();
      const txnFeatures = extractTxnFeatures(rawCsv);
      features = { ...features, ...txnFeatures };
    }

    // Call ML service
    const mlUrl = process.env.ML_SERVICE_URL || 'http://localhost:8001/predict';
    const apiKey = process.env.API_KEY || 'dev_api_key_here';

    const mlResp = await axios.post(
      mlUrl,
      { features },
      { headers: { 'x-api-key': apiKey, 'Content-Type': 'application/json' }, timeout: 20000 }
    );

    const { score, decision, explanation, model_version } = mlResp.data;

    const audit_id = uuidv4();
    const applicant = new Applicant({
      audit_id,
      name,
      phone,
      email,
      features,
      score,
      decision,
      explanation,
      model_version,
      raw_csv: rawCsv
    });

    await applicant.save();

    return res.json({
      ok: true,
      audit_id,
      score,
      decision,
      explanation,
      model_version
    });
  } catch (err: any) {
    console.error('verify error', err?.message || err);
    return res.status(500).json({ ok: false, error: err?.message || 'server error' });
  }
});

// GET /api/applicants - list recent applicants
router.get('/applicants', async (_req, res) => {
  try {
    const list = await Applicant.find().sort({ createdAt: -1 }).limit(200);
    res.json({ ok: true, applicants: list });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err?.message || 'server error' });
  }
});

// GET /api/applicants/:audit_id - get one applicant
router.get('/applicants/:audit_id', async (req, res) => {
  try {
    const a = await Applicant.findOne({ audit_id: req.params.audit_id });
    if (!a) return res.status(404).json({ ok: false, error: 'not found' });
    res.json({ ok: true, applicant: a });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err?.message || 'server error' });
  }
});

export default router;