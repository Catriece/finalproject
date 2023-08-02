import express from "express";
import login from "../controller/login.controllers";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    let user_info = req.body;
    let user = await login.loginAuthentication(user_info);

    if (user) {
      console.log(user.payload.username, "is signed in!");
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
});

export default router;
