import express from "express";
import comments from "../controller/journal.comments.controller";

const router = express.Router();

router.post("/newcomment", async (req, res, next) => {
  try {
    let content = req.body;
    let data = await comments.createComment(content);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.put("/updatecomment", async (req, res, next) => {
  try {
    let content = req.body;
    let data = await comments.updateComment(content);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
