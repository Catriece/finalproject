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

const getUsername = async (req) => {
  const { user_id } = req.body;

  if (user_id) {
    const username = await query("SELECT username FROM users WHERE id = ?", [
      user_id,
    ]);

    return username;
  } else {
    return false;
  }
};

export default {
  getMembers,
  getUsername,
};
