import bcrypt from "bcrypt";
import { Schema, Types, model } from "mongoose";

type UserDoc = {
  _id: Types.ObjectId;
  firstname: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  isDeleted: boolean;
  deletedAt: null | Date;
  _doc: any;
};

const userSchema = new Schema<UserDoc>(
  {
    firstname: { type: String, default: null },
    surname: { type: String, default: null },
    username: {
      type: String,
      minLength: [3, "username must be atleast 3 character go {value}"],
      required: [true, "username is required"],
      lowercase: true,
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      required: [true, "email is required"],
      lowercase: true,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "password must be atleast 8 character"],
    },
    avatar: { type: String, default: null, lowercase: true },
    role: { type: String, enum: ["user", "admin"], lowercase: true, default: "user" },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// hash password before saving to database
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

    return next();
  } catch (err: any) {
    return next(err);
  }
});

const User = model<UserDoc>("User", userSchema);

export default User;
