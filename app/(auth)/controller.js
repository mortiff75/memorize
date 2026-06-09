import { connectDb, db } from "@/db/db";
import User, { userSchemaZod } from "@/models/user";
import * as helper from "../../utils/helper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const register = async (preState, formData) => {
  const { email, password, username } = Object.fromEntries(formData);

  const validates = userSchemaZod.safeParse({ email, password, username });

  if (!validates.success)
    return {
      defaultValue: { email, password, username },
      errors: validates.error.flatten().fieldErrors,
    };

  try {
    await connectDb();

    const user = await User.create({ email, password, username });
  } catch (error) {
    return {
      defaultValue: { email, password, username },
      toast: error?.message,
    };
  }

  redirect("/login");
};

export const login = async (preState, formData) => {
  const { email, password } = Object.fromEntries(formData);

  const validate = userSchemaZod.safeParse({
    email,
    password,
    username: "123456",
  });

  if (!validate.success)
    return { success: false, errors: validate.error.flatten().fieldErrors };

  await connectDb();

  const user = await User.findOne({ email }).select([
    "password",
    "email",
    "username",
  ]);

  if (!user)
    return {
      success: false,
      errors: "email or password is wrong",
      defaultValue: { email, password },
    };

  const passwordIsValid = await helper.comparePassword(password, user.password);

  if (!passwordIsValid)
    return {
      success: false,
      errors: "email or password is wrong",
      defaultValue: { password, email },
    };

  const token = await helper.createToken(user.id);

  const cookieStore = await cookies();

  cookieStore.set("userId", token, {
    httpOnly: true, // جاوااسکریپت سمت کلاینت نمی‌تواند کوکی را بخواند (جلوگیری از XSS)
    secure: process.env.NODE_ENV === "production", // در حالت پروداکشن فقط روی HTTPS کار کند
    sameSite: "lax", // جلوگیری از حملات CSRF
    path: "/", // در تمام صفحات سایت در دسترس باشد
    maxAge: 1 * 24 * 60 * 60, // طول عمر کوکی به ثانیه (۷ روز)
  });

  redirect("/", "replace");
};

export const logout = async (preState, formData) => {
  const { id } = Object.fromEntries(formData);

  const cookieParser = await cookies();

  cookieParser.delete("userId");

  redirect("/login", "replace");
};
