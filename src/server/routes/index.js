import express from "express";
import newUserRouter from "./create.account.routes";
import updateUserRouter from "./user.routes";
import userRouter from "./login.routes";
import discussionPostRouter from "./discussion.posts.routes";
import milestonePostRouter from "./milestones.posts.route";
import journalPostRouter from "./journal.posts.routes";
import journalCommentsRouter from "./journal.comments.routes";
import discussionCommentRouter from "./discussion.comments.routes";

const router = express.Router();

router.get("/test", (req, res, next) => {
  res.send("Hello World!");
});

router.use("/user", userRouter);
router.use("/create", newUserRouter);
router.use("/updateuser", updateUserRouter);
router.use("/journal", journalPostRouter);
router.use("/journalcomments", journalCommentsRouter);
router.use("/discussion", discussionPostRouter);
router.use("/discussioncomments", discussionCommentRouter);
router.use("/milestone", milestonePostRouter);

export default router;
