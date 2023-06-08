import { RequestHandler } from "express";
import { allowedOrigins } from "../config/cors.config";

const credentials: RequestHandler = (req, res, next) => {
  const origin = req.headers.origin as string;

  if (allowedOrigins.includes(origin)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (res.header as any)("Access-Control-Allow-Credentials", true);
  }

  next();
};

export default credentials;
