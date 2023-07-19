import express from "express";
import milestone from "../controller/milestones.posts.controller";

const router = express.Router();

router.put("/post", async (req, res, next) => {
  try {
    let post = req.body;
    let data = await milestone.postMilestone(post);

    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
