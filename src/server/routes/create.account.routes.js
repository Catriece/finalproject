import express from "express";
import user from "../controller/create.account.controllers";

const router = express.Router();

// CREATES A NEW ACCOUNT
// ENSURES EMAIL AND USERNAME ARE NOT ALREADY IN USE
// USES FAMILY CODE TO ADD NEW USER TO AN EXISTING FAMILY CIRCLE

router.post("/newuser/verifycode", async (req, res, next) => {
  try {
    const { requestBody } = req.body;
    console.log("family code is", requestBody);

    let data = await user.searchFamilyCode(requestBody);

    console.log("MADE IT BACK TO THE ROUTE WITH DATA", data);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/newuser/verifycredentials", async (req, res, next) => {
  try {
    console.log("MADE IT TO THE ROUTE WITH", req.query);
    const { checkUsername, checkEmail } = req.query;
    console.log("USERNAME IS ", checkUsername);
    console.log("Email IS ", checkEmail);
    let data = await user.searchUsername(checkUsername);

    // let email = await user.searchEmail(checkEmail);

    console.log("WE MADE IT OUT THE FUNCTION WITH ", data);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/newuser/joincircle", async (req, res, next) => {
  try {
    let user_info = req.body;
    console.log("REQUEST BODY", user_info);
    if (user_info) {
      let new_username = await user.searchUsername(user_info);

      if (new_username) {
        let new_email = await user.searchEmail(user_info);

        if (new_email) {
          let new_user = await user.AddNewUserToFamilyCircleWithCode(user_info);

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

// ALLOWS EXISTING USER TO JOIN AN EXISTING FAMILY CIRCLE

router.post("/existinguser/joincircle", async (req, res, next) => {
  try {
    let user_info = req.body;
    console.log("REQUEST BODY", user_info);

    if (user_info) {
      let data = await user.AddExistingUserToFamilyCircleWithCode(user_info);

      res.json(data);
    } else {
      throw new Error("Error adding user to family circle");
    }
  } catch (err) {
    next(err);
  }
});

// ALLOWS USER TO CREATE AN ACCOUNT AND A NEW FAMILY CIRCLE

router.post("/newuser/newcircle", async (req, res, next) => {
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

// ALLOWS EXISTING USER TO CREATE A NEW FAMILY CIRCLE

router.post("/existinguser/newcircle", async (req, res, next) => {
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
