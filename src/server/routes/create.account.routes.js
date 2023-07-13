import express from "express";
import newUser from "../controller/create.account.controllers";

const router = express.Router();

// Create New Account

router.post("/", async (req, res, next) => {
  try {
    let user_info = req.body;
    console.log("REQUEST BODY", user_info);
    if (user_info) {
      let new_username = await newUser.searchUsername(user_info);

      if (new_username) {
        let new_email = await newUser.createEmail(user_info);

        if (new_email) {
          let new_user = await newUser.createUser(user_info);

          res.json(new_user);
        } else {
          throw new Error("Email is already in use");
        }
      } else {
        throw new Error("Username is unavailable");
      }
    }
  } catch (err) {
    next(err);
  }
});

export default router;
