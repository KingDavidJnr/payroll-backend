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
exports.createDisbursement = void 0;
const textCase_1 = require("./../utils/textCase");
const disburse_service_1 = require("./../services/disburse.service");
const mail_service_1 = __importDefault(require("../services/mail.service"));
const config_1 = require("../config");
const number_to_words_1 = __importDefault(require("number-to-words"));
const createDisbursement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqBody = req.body;
        // loop through each employee record
        reqBody.forEach((elem) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            const content = yield mail_service_1.default.generateEmailContent("payslip.temp", Object.assign(Object.assign({}, elem), { name: (0, textCase_1.titleCase)(elem.name), loan: (_a = elem === null || elem === void 0 ? void 0 : elem.loan) !== null && _a !== void 0 ? _a : 0, allowance: (_b = elem === null || elem === void 0 ? void 0 : elem.allowance) !== null && _b !== void 0 ? _b : 0, month: (0, textCase_1.titleCase)(elem.month), netSalaryInWords: (0, textCase_1.titleCase)(number_to_words_1.default.toWords(elem.netSalary)) }));
            // send mail to employee emails
            const mail = yield mail_service_1.default.sendMail({
                from: `Payme LLC <${config_1.mailConfig.mailFrom}>`,
                to: elem.email,
                subject: "Payslip for January 2023",
                html: content,
            });
            // store payroll data in database
            if (mail.response.includes("250 OK")) {
                yield (0, disburse_service_1.saveDisbursement)(Object.assign(Object.assign({}, elem), { emailStatus: "Sent" }));
            }
            else {
                yield (0, disburse_service_1.saveDisbursement)(Object.assign(Object.assign({}, elem), { emailStatus: "Error" }));
            }
        }));
        res.status(200).json({ message: "Payslip dispatched successfully" });
    }
    catch (error) {
        console.error("Error creating disbursement:", error);
        res.status(500).json({ error: "An error occurred while creating the disbursement" });
    }
});
exports.createDisbursement = createDisbursement;
