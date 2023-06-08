import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export interface TokenPayload extends JwtPayload {
  id: Types.ObjectId;
  email: string;
}
