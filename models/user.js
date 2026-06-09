import mongoose from "mongoose";
import { hash } from "bcryptjs";
import crypto from "crypto";
import * as zod from "zod";

export const userSchemaZod = zod.object({
  username: zod.string().trim().min(5, "username most be grather than 5"),
  email: zod.email("Please enter valid email"),
  password: zod.string().trim().min(3, "Password most be grater than 3"),
});

// User Shape Mongoose Model  *******

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Add valid userName"],
    unique: [true, "Each username must be unique"],
  },
  email: {
    type: String,
    required: [true, "ایمیل برای ثبت خاطراتت ضروریه"],
    unique: [true, "کاربری قبلا با این ایمیل ثبت نام کرده"],
    lowercase: true,
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "ایمیلی که وارد کردی به نظر درست نمیاد، دوباره چکش کن!",
    ],
  },
  password: { type: String, required: true, select: 0 },

  resetPasswordToken: { type: String },
  resetPasswordExpired: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

userSchema.methods.createHashPassword = function () {
  const resetHashPassword = crypto.randomBytes(32).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetHashPassword)
    .digest("hex");

  this.resetPasswordExpired = Date.now() + 5 * 60 * 1000;

  return resetHashPassword;
};

userSchema.statics.checkHashPassword = function (token) {
  return crypto.createHash("sha256").update(token).digest("hex");
};

userSchema.pre("save", async function () {
  if (!this.isModified("password")) throw new Error("Password is not modified");

  let hashPassword = await hash(this.password, 12);

  this.password = hashPassword;
});

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
