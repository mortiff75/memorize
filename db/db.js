import { connect } from "mongoose";

export var db;

export async function connectDb() {
  try {
    if (!db) {
      db = await connect(process.env.DATABASE_URL);
      console.log("Database is connected");
    }
  } catch (error) {
    throw new Error(error?.message || "Connect to database is denied");
  }
}
