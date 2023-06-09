"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailConfig = exports.jwtConfig = exports.dbConfig = exports.appConfig = void 0;
const app_config_1 = __importDefault(require("./app.config"));
exports.appConfig = app_config_1.default;
const db_config_1 = __importDefault(require("./db.config"));
exports.dbConfig = db_config_1.default;
const jwt_config_1 = __importDefault(require("./jwt.config"));
exports.jwtConfig = jwt_config_1.default;
const mail_config_1 = __importDefault(require("./mail.config"));
exports.mailConfig = mail_config_1.default;
