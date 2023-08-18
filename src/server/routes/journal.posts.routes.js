import express from "express";
import post from "../controller/journal.posts.controller";

const router = express.Router();

router.post("/newpost", async (req, res, next) => {
  try {
    let content = req.body;
    let data = await post.createPost(content);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.put("/updatepost", async (req, res, next) => {
  try {
    let content = req.body;
    let data = await post.updatePost(content);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/getposts", async (req, res, next) => {
  try {
    const data = await post.getUsersPosts(req);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/getallposts", async (req, res, next) => {
  try {
    const data = await post.getFamilyCirclesPosts(req);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.delete("/deletepost", async (req, res, next) => {
  try {
    const data = await post.deletePost(req);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
