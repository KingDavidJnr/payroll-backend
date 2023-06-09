"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const constants_1 = require("../constants");
// Authentication middleware
const authMiddleware = (req, // Extend Request type to include 'user' property
res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    if (!token) {
        return res.status(403).json({ success: false, error: constants_1.ERRORS.UNAUTHENTICATED });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.jwtConfig.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(403).json({ success: false, error: constants_1.ERRORS.INVALID_TOKEN });
    }
};
exports.default = authMiddleware;
