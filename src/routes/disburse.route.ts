import express from "express";
import { createDisbursement } from "../controllers/disburse.controller";
import { fetchDisbursementHistory } from "../controllers/fetchDisbursements.controller";
import { validateDisbursement } from "../middlewares/validation.middleware ";

const router = express.Router();

router.post("/", validateDisbursement, createDisbursement);
router.get("/fetch", fetchDisbursementHistory);

export default router;
