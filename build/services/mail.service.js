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
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
class MailService {
    generateEmailContent(fileName, tempObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const template = yield ejs_1.default.renderFile(path_1.default.join(process.cwd(), "src/views", `${fileName}.ejs`), Object.assign({}, tempObj));
            return template;
        });
    }
    createTransport(transObj) {
        return __awaiter(this, void 0, void 0, function* () {
            return nodemailer_1.default.createTransport(Object.assign({}, transObj));
        });
    }
    sendMail(mailObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const { auth, host, port, secure } = config_1.mailConfig;
            const transporter = yield this.createTransport({ host, port, secure, auth });
            const { from, to, subject, attachments, html, text } = mailObj;
            return transporter.sendMail({ from, to, subject, html, text, attachments });
        });
    }
}
exports.default = new MailService();
