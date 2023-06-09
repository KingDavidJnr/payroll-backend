"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchDisbursementHistory = void 0;
const disburse_model_1 = require("../models/disburse.model");
// Controller function for fetching disbursement status
const fetchDisbursementHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the disbursement status from the database or any other data source
        const disbursements = yield disburse_model_1.DisbursementModel.find({}, "-_id");
        // Map the disbursements to include the status field
        res.status(200).json({ success: true, data: disbursements });
    }
    catch (error) {
        console.error("Error fetching disbursement status:", error);
        res.status(500).json({ error: "An error occurred while fetching the disbursement status" });
    }
});
exports.fetchDisbursementHistory = fetchDisbursementHistory;
