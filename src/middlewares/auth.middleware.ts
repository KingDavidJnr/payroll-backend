import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { jwtConfig } from "../config";
import { ERRORS } from "../constants";

interface TokenPayload extends JwtPayload {
  userId: string;
}

// Authentication middleware
const authMiddleware = (
  req: Request & { user?: TokenPayload }, // Extend Request type to include 'user' property
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1] as string;

  if (!token) {
    return res.status(403).json({ success: false, error: ERRORS.UNAUTHENTICATED });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.ACCESS_TOKEN_SECRET) as TokenPayload;
    req.user = decoded;
    next();
  } catch (err: any) {
    return res.status(403).json({ success: false, error: ERRORS.INVALID_TOKEN });
  }
};

export default authMiddleware;
