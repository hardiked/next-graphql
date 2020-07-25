import mongoose from "mongoose";
import connectMongo from "../utils/connectMongoose";

export const connectTestDb = async () => {
  return await connectMongo();
};

export const dropTestDb = async () => {
  await mongoose.connection.db
    .dropDatabase()
    .catch((error) => console.error(error));
};

export const closeDbConnection = async () => {
  await mongoose.connection.close().catch((error) => console.error(error));
};
