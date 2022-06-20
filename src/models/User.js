import mongoose from "mongoose";
const DOCUMENT_NAME = "UserAccount";
const COLLECTION_NAME = "userAccounts";

export const userSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(DOCUMENT_NAME, userSchema, COLLECTION_NAME);
