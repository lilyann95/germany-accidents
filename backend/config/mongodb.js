import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(process.cwd(), "../.env"),
});

const connectMongoDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB connected successfully");
  });

  await mongoose.connect(process.env.MONGODB_URI_STRING, {
    autoIndex: true,
  });

  console.log(mongoose.connection.name);
};

export default connectMongoDB;
