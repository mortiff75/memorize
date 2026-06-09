import { connectDb } from "@/db/db";
import Memory, { memory_zod } from "@/models/memories";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";
// import { writeFile, unlink } from "fs/promises";

import { revalidatePath } from "next/cache";

import { put, del } from "@vercel/blob";

export const fetch_memories = async ({ title, date_memory, page }) => {
  const cookieStore = await cookies();

  const token = cookieStore.get("userId").value;

  const userId = await verifyToken(token);

  await connectDb();

  if (!userId) throw new Error("your session is expired please login");

  const filters = { user: userId };

  if (title?.trim()) {
    filters.title = { $regex: `^${title}`, $options: "i" };
  }

  if (date_memory) {
    filters.date_memory = { $lte: Number(date_memory) };
  }

  // if (category) {
  //   filters.category = category;
  // }

  const currentPage = page || 1;
  const limit = 8;
  const skip = (currentPage - 1) * limit;

  const memories = await Memory.find(filters)
    .sort({ createdAt: "desc" })
    .skip(skip)
    .limit(limit)
    .lean();

  const total_memories = await Memory.countDocuments(filters);

  return { memories, total_memories, currentPage, limit };
};

export const create = async (formData) => {
  try {
    const {
      image: file,
      title,
      description,
      location,
      date,
      user,
    } = Object.fromEntries(formData);

    const tags = JSON.parse(formData.get("tags"));

    if (!file) return { success: false, errors: "Please send a valid photo" };

    const is_valid_memory = memory_zod.safeParse({
      title,
      description,
      tags,
      location,
      image: file,
      date,
      user,
    });

    if (!is_valid_memory.success)
      return {
        success: false,
        errors: is_valid_memory?.error.flatten().fieldErrors,
      };

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random());

    const filename = `${uniqueSuffix}-${file.name}`;

    // filepath = path.join(process.cwd(), "public/images", filename);

    // const arrayBuffer = await file.arrayBuffer();

    // const buffer = Buffer.from(arrayBuffer);

    // await writeFile(filepath, buffer);

    const { url } = await put(filename, file, {
      access: "public",
      storeId: process.env.BLOB_STORE_ID,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    await connectDb();

    await Memory.create({
      title,
      description,
      tags,
      image: url,
      location,
      user,
      date,
    });

    return { success: true, message: "New Memory is created" };
  } catch (error) {
    return {
      success: false,
      errors: error?.message || "Create memory is denied",
    };
  }
};

export const delete_memory = async (id, image) => {
  if (!id) return { success: false, errors: "Bad Request 400 and not sent id" };

  await connectDb();

  await del(image, {
    storeId: process.env.BLOB_STORE_ID,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  const deleted_memory = await Memory.findByIdAndDelete(id);

  revalidatePath("/memories", "page");

  return { success: true, message: "Memory successfully deleted" };
};

export const update_memory = async (id, editedData) => {
  const isValid = memory_zod.safeParse({
    ...editedData,
    user: "ssfsf",
    image: null,
    tags: ["sw"],
  });

  if (!isValid.success)
    return { success: false, errors: isValid.error.flatten().fieldErrors };

  await Memory.findByIdAndUpdate({ _id: id }, { ...editedData });

  revalidatePath("/memories", "page");

  return { success: true, message: "Memory is Updated" };
};
