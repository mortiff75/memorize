import { connectDb } from "@/db/db";
import User from "@/models/user";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";

export async function getCurrentUser() {
  try {
    const token = (await cookies()).get("userId")?.value;

    if (!token) return null;

    const payload = await verifyToken(token);

    if (!payload) return null;

    await connectDb();

    const user = await User.findById(payload).lean();

    return JSON.parse(JSON.stringify({ ...user }));
  } catch {
    return null;
  }
}
