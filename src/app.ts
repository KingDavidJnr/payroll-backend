import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import router from "./routes";
import corsOptions from "./config/cors.config";
import credentials from "./middlewares/credentials.middleware";
import errorHandler from "./middlewares/errorHandler.middleware";
import cookieParser from "cookie-parser";

const app = express();

// middlewares
app.use(credentials); //handles options credentials check - before cors
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions)); //Allows incoming request from allowed origins
app.use(compression());

app.set("view engine", "ejs"); // set view engine that will be used for email template

// routes
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("welcome to our api homepage");
});

app.use(errorHandler);

export default app;
