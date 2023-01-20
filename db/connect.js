import mongoose from "mongoose";

export const connect = async () => mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@mongodb:27017/scd?authSource=admin`)