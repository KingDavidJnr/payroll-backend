"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors_config_1 = require("../config/cors.config");
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (cors_config_1.allowedOrigins.includes(origin)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        res.header("Access-Control-Allow-Credentials", true);
    }
    next();
};
exports.default = credentials;
