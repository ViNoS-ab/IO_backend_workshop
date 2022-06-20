import mongoose from "mongoose";
const DOCUMENT_NAME = "Article";
const COLLECTION_NAME = "articles";

export const articleSchema = new mongoose.Schema(
  {
    title: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ArticleModel = mongoose.model(
  DOCUMENT_NAME,
  articleSchema,
  COLLECTION_NAME
);
export default ArticleModel;
