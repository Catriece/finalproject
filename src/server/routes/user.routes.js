import express from "express";
import user from "../controller/user.controllers";

const router = express.Router();

// BIOGRAPHY ROUTERS

router.put("/biographyupdate", async (req, res, next) => {
  try {
    let data = await user.updateBiography(req);

    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/biography", async (req, res, next) => {
  try {
    let data = await user.getBiography(req.query);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// EMAIL ROUTERS
router.put("/email", async (req, res, next) => {
  try {
    let email = req.body;
    let data = await user.updateEmail(email);

    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/getemail", async (req, res, next) => {
  try {
    const { checkEmail } = req.query;

    let data = await user.getEmail(checkEmail);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// CREDENTIALS ROUTER
router.put("/firstname", async (req, res, next) => {
  try {
    let name = req.body;
    let data = await user.updateFirstName(name);

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

router.put("/middlename", async (req, res, next) => {
  try {
    let name = req.body;
    let data = await user.updateMiddleName(name);

    res.json(data);
  } catch (err) {
    next(err);
  }
});

// PASSWORD ROUTERS
router.put("/password", async (req, res, next) => {
  try {
    let data = await user.updatePassword(req);

    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/passwordreset", async (req, res, next) => {
  try {
    let data = await user.getPassword(req);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.put("/username", async (req, res, next) => {
  try {
    let data = await user.updateUsername(req);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/finduser", async (req, res, next) => {
  try {
    let data = await user.findUser(req);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// USERNAME ROUTERS
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

router.get("/getusername", async (req, res, next) => {
  try {
    let data = await user.getUsername(req);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

//PROFILE IMAGE ROUTER
router.get("/image", async (req, res, next) => {
  try {
    let data = await user.getImage(req);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
