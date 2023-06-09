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
const user_model_1 = __importDefault(require("../models/user.model"));
const constants_1 = require("../constants");
class UserService {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.default.findById(id).where("isDeleted").equals(false).select("-password");
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.default.findOne({ username }).where("isDeleted").equals(false);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.default.findOne({ email }).where("isDeleted").equals(false);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.default.find({}).where("isDeleted").equals(false).select("-password").lean();
        });
    }
    createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, username, password } = newUser;
            const user = yield user_model_1.default.findOne({ $or: [{ email }, { username }] });
            if (!user)
                return user_model_1.default.create({ email, username, password });
            throw new Error(constants_1.ERRORS.USER_EXIST);
        });
    }
    updateUser(id, newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findById(id);
            if (!user)
                throw new Error(constants_1.ERRORS.USER_NOT_FOUND);
            if (Object.keys(newUser).length === 0)
                throw new Error("please provide field(s) to update");
            return user_model_1.default.findByIdAndUpdate(id, Object.assign({}, newUser));
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findById(id);
            if (!user)
                throw new Error(constants_1.ERRORS.USER_NOT_FOUND);
            return user_model_1.default.findByIdAndUpdate(id, {
                isDeleted: true,
                deletedAt: new Date(),
            });
        });
    }
}
exports.default = new UserService();
