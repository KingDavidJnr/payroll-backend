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
exports.validateDisbursement = exports.validateUser = exports.validateLogin = exports.validateSignup = void 0;
const signup_schema_1 = __importDefault(require("../schema/signup.schema"));
const login_schema_1 = __importDefault(require("../schema/login.schema"));
const user_schema_1 = __importDefault(require("../schema/user.schema"));
const disburse_schema_1 = __importDefault(require("../schema/disburse.schema"));
const validateSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield signup_schema_1.default.validateAsync(Object.assign({}, req.body), { abortEarly: false, allowUnknown: false });
        next();
    }
    catch (err) {
        err.statusCode = 401;
        next(err);
    }
});
exports.validateSignup = validateSignup;
const validateLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield login_schema_1.default.validateAsync(Object.assign({}, req.body), { abortEarly: false, allowUnknown: false });
        next();
    }
    catch (err) {
        err.statusCode = 401;
        next(err);
    }
});
exports.validateLogin = validateLogin;
const validateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_schema_1.default.validateAsync(Object.assign({}, req.body), { abortEarly: false, allowUnknown: false });
        next();
    }
    catch (err) {
        err.statusCode = 401;
        next(err);
    }
});
exports.validateUser = validateUser;
const validateDisbursement = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield disburse_schema_1.default.validateAsync(req.body, { abortEarly: false, allowUnknown: false });
        next();
    }
    catch (err) {
        console.log(err);
        err.statusCode = 401;
        next(err);
    }
});
exports.validateDisbursement = validateDisbursement;
