import express from "express";
import discussion from "../controller/discussion.posts.controller";

const router = express.Router();

//UPDATES POST BASED ON TIME

router.get("/post", async (req, res, next) => {
  try {
    const data = await discussion.getDiscussionPost(req);

    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/response", async (req, res, next) => {
  try {
    const content = req.body;
    const data = await discussion.postResponse(content);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
