import express from "express";
import comments from "../controller/discussion.comments.controller";

const router = express.Router();

router.post("/postcomment", async (req, res, next) => {
  try {
    let content = req.body;
    let data = await comments.addComment(content);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.put("/commentupdate", async (req, res, next) => {
  try {
    let content = req.body;
    let data = await comments.updateComment(content);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/retrieval/:id/:family_code", async (req, res, next) => {
  try {
    const { id, family_code } = req.params;
    const data = await comments.getDiscussionPostComments({ id, family_code });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
