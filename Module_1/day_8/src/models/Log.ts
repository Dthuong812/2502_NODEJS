import mongoose, { Schema, Document } from 'mongoose';

export interface ILog extends Document {
  method: string;
  path: string;
  timestamp: string;
  statusCode: number;
  userAgent: string;
  ip: string;
}

const logSchema = new Schema<ILog>({
  method: { type: String, required: true },
  path: { type: String, required: true },
  timestamp: { type: String, required: true },
  statusCode: { type: Number, required: true },
  userAgent: { type: String },
  ip: { type: String },
});

export const LogModel = mongoose.model<ILog>('Log', logSchema);