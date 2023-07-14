import express from "express";
import newUserRouter from "./create.account.routes";
import updateUserRouter from "./user.routes";
import userRouter from "./login.routes";
import addFamilyMemberRouter from "./family.relationships.routes";

const router = express.Router();

router.get("/test", (req, res, next) => {
  res.send("Hello World!");
});

router.use("/user", userRouter);
router.use("/create", newUserRouter);
router.use("/updateuser", updateUserRouter);
router.use("/addfamilymember", addFamilyMemberRouter);

export default router;
