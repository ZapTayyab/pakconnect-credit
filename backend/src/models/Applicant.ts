import mongoose, { Schema } from 'mongoose';

const ApplicantSchema = new Schema({
  audit_id: { type: String, index: true },
  name: { type: String },
  phone: { type: String },
  email: { type: String },
  features: { type: Schema.Types.Mixed },
  score: { type: Number },
  decision: { type: String },
  explanation: { type: Schema.Types.Mixed },
  model_version: { type: String },
  raw_csv: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Applicant', ApplicantSchema);