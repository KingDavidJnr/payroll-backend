import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import { MESSAGES } from "../constants";
import { jwtConfig } from "../config";
import { TokenPayload } from "../interfaces/token.interface";

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken, user } = await authService.login(req.body, res);

      return res.status(200).json({ success: true, accessToken, user });
    } catch (err: any) {
      err.statusCode = 401;
      next(err);
    }
  }
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.createUser(req.body);
      res.status(201).json({ success: true, message: MESSAGES.CREATED });
    } catch (err: any) {
      err.statusCode = 401;
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.logout(res);

      return res.status(200).json({ success: true, message: "logout successful" });
    } catch (err: any) {
      err.statusCode = 401;
      next(err);
    }
  }
  async handleRefreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.jwt;
      const user: TokenPayload = jwt.verify(
        refreshToken,
        jwtConfig.REFRESH_TOKEN_SECRET
      ) as TokenPayload;
      const accessToken = await authService.generateAccessToken({
        userId: user.id,
      });

      return res.status(200).json({ success: true, ...accessToken });
    } catch (err: any) {
      err.statusCode = 401;
      next(err);
    }
  }
}

export default new AuthController();
