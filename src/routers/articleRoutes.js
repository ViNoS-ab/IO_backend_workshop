import express from "express";
import {
  addArticle,
  deleteArticle,
  getArticles,
  updateArticle,
} from "../controllers/articleController.js";
const router = express.Router();

router.get("/", getArticles);
router.post("/add", addArticle);
router.delete("/delete/:id", deleteArticle);
router.put("/update/:id", updateArticle);

export default router;
