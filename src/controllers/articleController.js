import Article from "../models/Article.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function getArticles(_req, res) {
  try {
    const articles = await Article.find({});

    return res.status(200).json({
      status: 200,
      data: articles,
      message: "Succesfully Retrieved articles",
    });
  } catch (e) {
    return res.status(500).send("server error");
  }
}

export async function addArticle(req, res) {
  try {
    const token = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);
    let article = new Article({ ...req.body, authorId: token.id });
    article.save();
    return res
      .status(200)
      .json({ status: 201, message: "Succesfully Created" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

export async function deleteArticle(req, res) {
  try {
    const token = req.cookies.jwt;
    const checkedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(checkedToken.id);
    const article = await Article.findById(req.params.id);

    if (article.authorId.toString() !== user._id.toString())
      return res.status(403).send("you are not the post owner");
    if (!article) {
      return res.status(404).send("there is no article with this id");
    }
    await Article.deleteOne({ _id: req.params.id });
    return res
      .status(200)
      .json({ status: 200, data: article, message: "Succesfully deleted" });
  } catch (e) {
    return res.status(500).send("server error");
  }
}

export async function updateArticle(req, res) {
  try {
    const { title, content } = req.body;
    const token = req.cookies.jwt;
    const checkedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(checkedToken.id);
    const article = await Article.findById(req.params.id);

    if (article.authorId.toString() !== user._id.toString())
      return res.status(403).send("you are not the post owner");
    if (!article) {
      return res.status(404).send("there is no article with this id");
    }
    await Article.findByIdAndUpdate(req.params.id, { title, content });
    return res.status(200).send("Succesfully updated");
  } catch (e) {
    return res.status(500).send("server error");
  }
}
