import express from "express";
import newUserRouter from "./create.account.routes";
import updateUserRouter from "./user.routes";
import userRouter from "./login.routes";
import discussionPostRouter from "./discussion.posts.routes";
import journalPostRouter from "./journal.posts.routes";
import retrieveInfoRouter from "./retrieve.info.routes";

const router = express.Router();

router.get("/test", (req, res, next) => {
  res.send("Hello World!");
});

router.use("/user", userRouter);
router.use("/create", newUserRouter);
router.use("/updateuser", updateUserRouter);
router.use("/journal", journalPostRouter);
router.use("/discussion", discussionPostRouter);
router.use("/retrieve", retrieveInfoRouter);

export default router;
