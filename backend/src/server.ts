import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import verifyRouter from './routes/verify';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', verifyRouter);

app.get('/', (_req, res) => res.json({ status: 'pakconnect-backend ok' }));

const PORT = parseInt(process.env.PORT || '5000', 10);
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pakconnect';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });