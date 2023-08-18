import express from "express";
import retrieve from "../controller/retrieve.info.controllers";

const router = express.Router();

// FAMILY CIRCLE ROUTER

router.post("/familycircle", async (req, res, next) => {
  try {
    let data = await retrieve.getMembers(req);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
