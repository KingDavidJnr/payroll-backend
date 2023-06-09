"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const database_1 = __importDefault(require("./database"));
// start up server
app_1.default.listen(config_1.appConfig.PORT, () => {
    console.log(`server running on http://${config_1.appConfig.HOST}:${config_1.appConfig.PORT}`);
    database_1.default.connect(config_1.dbConfig.DATABASE_URI); //connection to database
});
