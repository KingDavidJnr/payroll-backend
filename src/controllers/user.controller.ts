import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import { parseId } from "../utils/parseId.util";
import { ERRORS, MESSAGES } from "../constants";

class UserController {
  async fetchAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.findAll();
      return res.status(200).json({ success: true, users });
    } catch (err: any) {
      err.statusCode = 401;
      next(err);
    }
  }
  async fetchUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseId(req.params.id);
      const user = await userService.findById(id);

      if (!user) throw new Error(ERRORS.USER_NOT_FOUND);

      return res.status(200).json({ success: true, user });
    } catch (err: any) {
      err.statusCode = 401;
      next(err);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseId(req.params.id);

      await userService.updateUser(id, req.body);

      return res.status(200).json({ success: true, message: MESSAGES.UPDATED });
    } catch (err: any) {
      err.statusCode = 401;
      next(err);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseId(req.params.id);

      await userService.deleteUser(id);
      return res.status(200).json({ success: true, message: MESSAGES.DELETED });
    } catch (err: any) {
      err.statusCode = 401;
      next(err);
    }
  }

  /** handles upload of user avatar */
  async uploadAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({ success: true, message: MESSAGES.UPLOAD_SUCCESS });
    } catch (err: any) {
      err.statusCode = 401;
      next(err);
    }
  }
}

export default new UserController();
