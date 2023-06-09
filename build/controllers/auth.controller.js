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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
const user_service_1 = __importDefault(require("../services/user.service"));
const constants_1 = require("../constants");
const config_1 = require("../config");
class AuthController {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { accessToken, user } = yield auth_service_1.default.login(req.body, res);
                return res.status(200).json({ success: true, accessToken, user });
            }
            catch (err) {
                err.statusCode = 401;
                next(err);
            }
        });
    }
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_service_1.default.createUser(req.body);
                res.status(201).json({ success: true, message: constants_1.MESSAGES.CREATED });
            }
            catch (err) {
                err.statusCode = 401;
                next(err);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield auth_service_1.default.logout(res);
                return res.status(200).json({ success: true, message: "logout successful" });
            }
            catch (err) {
                err.statusCode = 401;
                next(err);
            }
        });
    }
    handleRefreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.cookies.jwt;
                const user = jsonwebtoken_1.default.verify(refreshToken, config_1.jwtConfig.REFRESH_TOKEN_SECRET);
                const accessToken = yield auth_service_1.default.generateAccessToken({
                    userId: user.id,
                });
                return res.status(200).json(Object.assign({ success: true }, accessToken));
            }
            catch (err) {
                err.statusCode = 401;
                next(err);
            }
        });
    }
}
exports.default = new AuthController();
