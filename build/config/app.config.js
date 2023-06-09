"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const appConfig = {
    PORT: parseInt(process.env.PORT) || 5000,
    HOST: process.env.HOST || "localhost",
    NODE_ENV: process.env.NODE_ENV,
};
exports.default = appConfig;
