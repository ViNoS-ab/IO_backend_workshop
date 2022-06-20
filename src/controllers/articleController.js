import Article from "../models/Article.js";

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
    let article = new Article(req.body);
    article.save();
    return res
      .status(200)
      .json({ status: 201, message: "Succesfully Created" });
  } catch (e) {
    return res.status(500).send("server error");
  }
}

export async function deleteArticle(req, res) {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res
        .status(404)
        .json({ status: 404, message: "there is no article with this id" });
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
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res
        .status(404)
        .json({ status: 404, message: "there is no article with this id" });
    }
    await Article.findByIdAndUpdate(req.params.id, { title, content });
    return res.status(200).send("Succesfully updated");
  } catch (e) {
    return res.status(500).send("server error");
  }
}
