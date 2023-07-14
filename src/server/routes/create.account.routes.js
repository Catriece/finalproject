import express from "express";
import user from "../controller/create.account.controllers";

const router = express.Router();

// Create New Account

router.post("/user", async (req, res, next) => {
  try {
    let user_info = req.body;
    console.log("REQUEST BODY", user_info);
    if (user_info) {
      let new_username = await user.searchUsername(user_info);

      if (new_username) {
        let new_email = await user.searchEmail(user_info);

        if (new_email) {
          let new_user = await user.createUser(user_info);

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

router.post("/newuser/familycircle", async (req, res, next) => {
  try {
    let user_info = req.body;
    console.log("req body", user_info);

    if (user_info) {
      let new_circle = await user.createFamilyCircleForNewUser(user_info);

      res.json(new_circle);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/existinguser/familycircle", async (req, res, next) => {
  try {
    let user_info = req.body;
    console.log("req body", user_info);

    if (user_info) {
      let new_circle = await user.createFamilyCircleForExistingUser(user_info);

      res.json(new_circle);
    }
  } catch (err) {
    next(err);
  }
});

export default router;
