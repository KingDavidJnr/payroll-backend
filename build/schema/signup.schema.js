"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const signupValidationSchema = joi_1.default.object({
    username: joi_1.default.string().required().trim(),
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .trim()
        .required(),
    password: joi_1.default.string().required().min(8),
    role: joi_1.default.string().optional(),
});
exports.default = signupValidationSchema;
