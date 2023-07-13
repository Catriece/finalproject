import express from "express";
import newUserRouter from "./create.account.routes";

const router = express.Router();

router.get("/test", (req, res, next) => {
  res.send("Hello World!");
});

router.use("/newuser", newUserRouter);

export default router;
