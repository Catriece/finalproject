import express from "express";
import relationship from "../controller/family.relationships.controller";
import checkUserRole from "../middlewares/check.role";

const router = express.Router();

router.put("/", checkUserRole, async (req, res, next) => {
  try {
    let user_info = req.body;
    console.log("REQ BODY FR", user_info);

    if (user_info) {
      let confirm_user = await relationship.confirmUserAccount(user_info);
      console.log("USER CONFIRMED", confirm_user);

      if (confirm_user.length > 0) {
        let add_member = await relationship.addMember(user_info);

        res.json(add_member);
      } else {
        throw new Error("User Account Not Found");
      }
    }
  } catch (err) {
    next(err);
  }
});

export default router;
