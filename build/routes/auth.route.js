"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_middleware_1 = require("./../middlewares/validation.middleware ");
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const router = (0, express_1.Router)();
router.post("/login", validation_middleware_1.validateLogin, auth_controller_1.default.login);
router.post("/signup", validation_middleware_1.validateSignup, auth_controller_1.default.signup);
router.get("/logout", auth_controller_1.default.logout);
exports.default = router;
