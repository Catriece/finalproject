import express from "express";
import discussion from "../controller/discussion.posts.controller";

const router = express.Router();

//UPDATES POST BASED ON TIME

router.get("/post/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await discussion.postDiscussion({ id });

    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
