"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const routes_1 = __importDefault(require("./routes"));
const cors_config_1 = __importDefault(require("./config/cors.config"));
const credentials_middleware_1 = __importDefault(require("./middlewares/credentials.middleware"));
const errorHandler_middleware_1 = __importDefault(require("./middlewares/errorHandler.middleware"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// middlewares
app.use(credentials_middleware_1.default); //handles options credentials check - before cors
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)(cors_config_1.default)); //Allows incoming request from allowed origins
app.use((0, compression_1.default)());
app.set("view engine", "ejs"); // set view engine that will be used for email template
// routes
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.send("welcome to our api homepage");
});
app.use(errorHandler_middleware_1.default);
exports.default = app;
