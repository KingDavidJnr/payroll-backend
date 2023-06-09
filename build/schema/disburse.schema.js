"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Define the JOI validation schema for the disbursement
const disbursementSchema = joi_1.default.array()
    .min(1)
    .items(joi_1.default.object({
    name: joi_1.default.string().required(),
    employeeId: joi_1.default.number().required(),
    jobRole: joi_1.default.string().required(),
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .trim()
        .required(),
    appraisalScore: joi_1.default.number().required(),
    totalWorkingHours: joi_1.default.number().required(),
    yearsOfService: joi_1.default.number().required(),
    tax: joi_1.default.number().required(),
    monthlyBasePay: joi_1.default.number().required(),
    bonus: joi_1.default.number().required(),
    totalDeduction: joi_1.default.number().required(),
    totalSalary: joi_1.default.number().required(),
    netSalary: joi_1.default.number().required(),
    month: joi_1.default.string().required(),
    year: joi_1.default.number().required(),
    loan: joi_1.default.number(),
    allowance: joi_1.default.number(),
}));
exports.default = disbursementSchema;
