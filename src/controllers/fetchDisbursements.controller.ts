import { Request, Response } from "express";
import { DisbursementModel, DisbursementDocument } from "../models/disburse.model";

// Controller function for fetching disbursement status
export const fetchDisbursementHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch the disbursement status from the database or any other data source
    const disbursements: DisbursementDocument[] = await DisbursementModel.find({}, "-_id");

    // Map the disbursements to include the status field

    res.status(200).json({ success: true, data: disbursements });
  } catch (error) {
    console.error("Error fetching disbursement status:", error);
    res.status(500).json({ error: "An error occurred while fetching the disbursement status" });
  }
};
