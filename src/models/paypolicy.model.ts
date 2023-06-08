import { Schema, Types, model } from "mongoose";

type PayPolicy = {
  _id: Types.ObjectId;
  policyName: string;
  condition: string;
  salaryAdjustment: string;
  isDeleted: boolean;
};

const payPolicySchema = new Schema<PayPolicy>(
  {
    policyName: {type: String},
    condition: {type: String},
    salaryAdjustment: {type: String} 
  });

const PayPolicy = model<PayPolicy>("PayPolicy", payPolicySchema);

export default PayPolicy;