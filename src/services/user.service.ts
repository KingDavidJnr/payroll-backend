import { Types } from "mongoose";
import { ICreateUser } from "../interfaces/signup.interface";
import User from "../models/user.model";
import { ERRORS } from "../constants";

class UserService {
  async findById(id: Types.ObjectId) {
    return User.findById(id).where("isDeleted").equals(false).select("-password");
  }

  async findByUsername(username: string) {
    return User.findOne({ username }).where("isDeleted").equals(false);
  }

  async findByEmail(email: string) {
    return User.findOne({ email }).where("isDeleted").equals(false);
  }

  async findAll() {
    return User.find({}).where("isDeleted").equals(false).select("-password").lean();
  }

  async createUser(newUser: ICreateUser) {
    const { email, username, password } = newUser;
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (!user) return User.create({ email, username, password });

    throw new Error(ERRORS.USER_EXIST);
  }

  async updateUser(id: Types.ObjectId, newUser: Partial<ICreateUser>) {
    const user = await this.findById(id);

    if (!user) throw new Error(ERRORS.USER_NOT_FOUND);

    if (Object.keys(newUser).length === 0) throw new Error("please provide field(s) to update");

    return User.findByIdAndUpdate(id, { ...newUser });
  }

  async deleteUser(id: Types.ObjectId) {
    const user = await this.findById(id);

    if (!user) throw new Error(ERRORS.USER_NOT_FOUND);

    return User.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  }
}

export default new UserService();
