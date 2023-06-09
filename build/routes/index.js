"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const user_route_1 = __importDefault(require("./user.route"));
const refreshToken_route_1 = __importDefault(require("./refreshToken.route"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const disburse_route_1 = __importDefault(require("./disburse.route"));
const router = (0, express_1.Router)();
router.use("/auth", auth_route_1.default);
router.use("/users", auth_middleware_1.default, user_route_1.default);
router.use("/refresh", refreshToken_route_1.default);
router.use("/disbursement", auth_middleware_1.default, disburse_route_1.default);
exports.default = router;
