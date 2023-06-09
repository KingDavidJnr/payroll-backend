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
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDisbursement = void 0;
const disburse_model_1 = require("../models/disburse.model");
// Handler for the HTTP POST method to save disbursement data
const saveDisbursement = (reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    const newDisbursement = new disburse_model_1.DisbursementModel(reqBody);
    // Save the disbursement document to the database
    return newDisbursement.save();
});
exports.saveDisbursement = saveDisbursement;
