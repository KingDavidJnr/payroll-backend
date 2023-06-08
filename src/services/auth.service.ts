import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { ILogin } from "../interfaces/login.interface";
import userService from "./user.service";
import { ERRORS } from "../constants";
import { jwtConfig } from "../config/index";
import { Response } from "express";

type TokenProps = {
  userId: Types.ObjectId;
};

class AuthService {
  async generateAccessToken(userId: TokenProps) {
    const token = jwt.sign({ userId }, jwtConfig.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });

    return { accessToken: token };
  }

  async generateRefreshTooken(userId: TokenProps) {
    return jwt.sign({ userId }, jwtConfig.REFRESH_TOKEN_SECRET, { expiresIn: "3d" });
  }

  async setCookie(value: string, res: Response) {
    const expire = 3 * 24 * 60 * 60 * 1000;

    return res.cookie("jwt", value, {
      httpOnly: true,
      maxAge: expire,
      secure: true,
      sameSite: "none",
    });
  }

  async login(reqBody: ILogin, res: Response) {
    const { email, password } = reqBody;
    const user = await userService.findByEmail(email);

    if (!user) throw new Error(ERRORS.INVALID_EMAIL_PWD);

    const pwdMatch = await bcrypt.compare(password, user.password);

    if (!pwdMatch) throw new Error(ERRORS.INVALID_EMAIL_PWD);

    const accessToken = await this.generateAccessToken({ userId: user._id });
    const refreshToken = await this.generateRefreshTooken({ userId: user._id });
    const newUser = await userService.findById(user._id);

    await this.setCookie(refreshToken, res);

    return { ...accessToken, user: newUser };
  }

  async logout(res: Response) {
    return res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  }
}

export default new AuthService();
