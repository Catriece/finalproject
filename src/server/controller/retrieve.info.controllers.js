import query from "../db/utils";

const getMembers = async (req) => {
  const { user_id, code } = req.body;

  if (user_id && code) {
    const members = await query(
      "SELECT id, profile_picture FROM users WHERE family_code = ?",
      [code]
    );

    return members;
  } else {
    return false;
  }
};
export default {
  getMembers,
};
