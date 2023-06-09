"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_middleware_1 = require("./../middlewares/validation.middleware ");
const user_controller_1 = __importDefault(require("./../controllers/user.controller"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", user_controller_1.default.fetchAllUsers);
router
    .route("/:id")
    .get(user_controller_1.default.fetchUser)
    .put(validation_middleware_1.validateUser, user_controller_1.default.updateUser)
    .delete(user_controller_1.default.deleteUser);
router.put("/:id/upload", user_controller_1.default.uploadAvatar);
exports.default = router;
