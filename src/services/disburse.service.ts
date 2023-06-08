import { DisbursementModel } from "../models/disburse.model";
import { IDisbursement } from "../interfaces/disbursement.interface";

// Handler for the HTTP POST method to save disbursement data

export const saveDisbursement = async (reqBody: IDisbursement) => {
  const newDisbursement = new DisbursementModel(reqBody);

  // Save the disbursement document to the database
  return newDisbursement.save();
};
