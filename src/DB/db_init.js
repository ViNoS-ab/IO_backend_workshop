import mongoose from "mongoose";
import "dotenv/config";

const URI = process.env.DATABASE_URI;

const ConnectDB = () => {
  mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true });
  console.log("Connection Done");
};

export default ConnectDB;
