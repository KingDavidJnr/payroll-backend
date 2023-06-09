"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = {
    mongoose: mongoose_1.default,
    connect: (url) => {
        mongoose_1.default.Promise = Promise;
        mongoose_1.default
            .set("strictQuery", true)
            .connect(url)
            .then(() => console.log("connection to database successful"))
            .catch((err) => console.log(err.message));
    },
    disconnect: () => {
        mongoose_1.default.disconnect();
    },
};
