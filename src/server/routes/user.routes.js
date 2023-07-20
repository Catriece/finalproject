import express from "express";
import user from "../controller/user.controllers";

const router = express.Router();

router.put("/profilepicture", async (req, res, next) => {
  try {
    let url = req.body;
    let data = await user.updateProfilePicture(url);

    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.put("/coverphoto", async (req, res, next) => {
  try {
    let url = req.body;
    let data = await user.updateProfilePicture(url);

    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.put("/biography", async (req, res, next) => {
  try {
    let user_info = req.body;
    let data = await user.updateBiography(user_info);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.put("/firstname", async (req, res, next) => {
  try {
    let name = req.body;
    let data = await user.updateFirstName(name);

    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.put("/middlename", async (req, res, next) => {
  try {
    let name = req.body;
    let data = await user.updateMiddleName(name);

    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.put("/lastname", async (req, res, next) => {
  try {
    let name = req.body;
    let data = await user.updateLastName(name);

    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.put("/email", async (req, res, next) => {
  try {
    let email = req.body;
    let data = await user.updateEmail(email);

    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.put("/password", async (req, res, next) => {
  try {
    let password = req.body;
    let data = await user.updatePassword(password);

    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/username", async (req, res, next) => {
  try {
    let email = req.body.email;

    if (!email) {
      throw new Error("Email parameter is missing");
    }

    let data = await user.findUsername(email);

    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
