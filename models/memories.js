import mongoose from "mongoose";
import * as zod from "zod";

export const memory_zod = zod.object({
  user: zod.string().trim(),
  title: zod.string().trim().nonempty("Please add title for your memory"),
  description: zod
    .string()
    .trim()
    .nonempty("Please add content for your memory"),
  image: zod.instanceof(File).nullable(),
  tags: zod.array(zod.string()).nonempty("tags is required"),
  date: zod.string().trim().nonempty("date for each memory is required"),
});

const memorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Each Memory most have a user Please login again"],
  },
  title: {
    type: String,
    required: [true, "Please add title for your memory"],
  },
  description: {
    type: String,
    required: [true, "Please add content for your memory"],
  },
  images: {
    type: [String],
    required: [true, "Each memory must have 1 photo at least"],
  },
  image: {
    type: String,
    required: [true, "Each memory must have 1 photo at least"],
  },

  location: { type: String }, // اختیاری: مکان ثبت خاطره
  tags: [String], // برچسب‌هایی مثل #سفر، #تولد
  date: {
    type: String,
    required: [true, "تاریخ باید برای هر خاطره ایی نوشته شود"],
  }, // تاریخی که خاطره رخ داده
  createdAt: { type: Date, default: Date.now },
});

memorySchema.index({ title: "text", description: "text" });

const Memory =
  mongoose.models?.Memory || mongoose.model("Memory", memorySchema);

export default Memory;
