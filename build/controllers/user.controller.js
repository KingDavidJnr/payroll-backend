"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
const parseId_util_1 = require("../utils/parseId.util");
const constants_1 = require("../constants");
class UserController {
    fetchAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_service_1.default.findAll();
                return res.status(200).json({ success: true, users });
            }
            catch (err) {
                err.statusCode = 401;
                next(err);
            }
        });
    }
    fetchUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (0, parseId_util_1.parseId)(req.params.id);
                const user = yield user_service_1.default.findById(id);
                if (!user)
                    throw new Error(constants_1.ERRORS.USER_NOT_FOUND);
                return res.status(200).json({ success: true, user });
            }
            catch (err) {
                err.statusCode = 401;
                next(err);
            }
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (0, parseId_util_1.parseId)(req.params.id);
                yield user_service_1.default.updateUser(id, req.body);
                return res.status(200).json({ success: true, message: constants_1.MESSAGES.UPDATED });
            }
            catch (err) {
                err.statusCode = 401;
                next(err);
            }
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (0, parseId_util_1.parseId)(req.params.id);
                yield user_service_1.default.deleteUser(id);
                return res.status(200).json({ success: true, message: constants_1.MESSAGES.DELETED });
            }
            catch (err) {
                err.statusCode = 401;
                next(err);
            }
        });
    }
    /** handles upload of user avatar */
    uploadAvatar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json({ success: true, message: constants_1.MESSAGES.UPLOAD_SUCCESS });
            }
            catch (err) {
                err.statusCode = 401;
                next(err);
            }
        });
    }
}
exports.default = new UserController();
