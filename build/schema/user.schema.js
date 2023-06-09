"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userValidationSchema = joi_1.default.object({
    firstname: joi_1.default.string().optional(),
    surname: joi_1.default.string().optional(),
    username: joi_1.default.string().optional(),
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .trim(),
    role: joi_1.default.string().optional(),
});
exports.default = userValidationSchema;
