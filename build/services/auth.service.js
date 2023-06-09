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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = __importDefault(require("./user.service"));
const constants_1 = require("../constants");
const index_1 = require("../config/index");
class AuthService {
    generateAccessToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign({ userId }, index_1.jwtConfig.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
            return { accessToken: token };
        });
    }
    generateRefreshTooken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.sign({ userId }, index_1.jwtConfig.REFRESH_TOKEN_SECRET, { expiresIn: "3d" });
        });
    }
    setCookie(value, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const expire = 3 * 24 * 60 * 60 * 1000;
            return res.cookie("jwt", value, {
                httpOnly: true,
                maxAge: expire,
                secure: true,
                sameSite: "none",
            });
        });
    }
    login(reqBody, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = reqBody;
            const user = yield user_service_1.default.findByEmail(email);
            if (!user)
                throw new Error(constants_1.ERRORS.INVALID_EMAIL_PWD);
            const pwdMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!pwdMatch)
                throw new Error(constants_1.ERRORS.INVALID_EMAIL_PWD);
            const accessToken = yield this.generateAccessToken({ userId: user._id });
            const refreshToken = yield this.generateRefreshTooken({ userId: user._id });
            const newUser = yield user_service_1.default.findById(user._id);
            yield this.setCookie(refreshToken, res);
            return Object.assign(Object.assign({}, accessToken), { user: newUser });
        });
    }
    logout(res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.clearCookie("jwt", {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
        });
    }
}
exports.default = new AuthService();
