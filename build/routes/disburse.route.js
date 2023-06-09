"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const disburse_controller_1 = require("../controllers/disburse.controller");
const fetchDisbursements_controller_1 = require("../controllers/fetchDisbursements.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware ");
const router = express_1.default.Router();
router.post("/", validation_middleware_1.validateDisbursement, disburse_controller_1.createDisbursement);
router.get("/fetch", fetchDisbursements_controller_1.fetchDisbursementHistory);
exports.default = router;
