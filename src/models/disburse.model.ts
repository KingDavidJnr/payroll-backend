import mongoose, { Schema, Document } from "mongoose";
import { IDisbursement } from "../interfaces/disbursement.interface";

// Define the interface for the disbursement model

// Define the schema for the disbursement model
const DisbursementSchema: Schema = new Schema({
  name: { type: String, required: true },
  employeeId: { type: Number, required: true },
  jobRole: { type: String, required: true },
  email: { type: String, required: true },
  appraisalScore: { type: Number, required: true },
  totalWorkingHours: { type: Number, required: true },
  yearsOfService: { type: Number, required: true },
  tax: { type: Number, default: 0 },
  loan: { type: Number, required: true, default: 0 },
  monthlyBasePay: { type: Number, required: true },
  bonus: { type: Number, required: true },
  totalDeduction: { type: Number, required: true },
  totalSalary: { type: Number, required: true },
  netSalary: { type: Number, required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  allowance: { type: Number, default: 0 },
  emailStatus: { type: String, enum: ["Sent", "Pending", "Error"], default: "Pending" },
});

// Define the interface for the Disbursement document
interface DisbursementDocument extends Document, Omit<IDisbursement, "id"> {}

// Create the Disbursement model from the schema
const DisbursementModel = mongoose.model<DisbursementDocument>("Disbursement", DisbursementSchema);

export { DisbursementDocument, DisbursementModel };
