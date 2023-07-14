import query from "../db/utils";

const confirmUserAccount = async (user_info) => {
  const { username } = user_info;

  if (username) {
    return await query("SELECT username FROM users WHERE username = ?", [
      username,
    ]);
  }
};

const addMember = async (user_info) => {
  const { user_id, first_name, middle_name, last_name, relationship } =
    user_info;

  if (user_info) {
    return await query(
      "INSERT INTO family_relationships (user_id, first_name, middle_name, last_name, relationship) VALUES (?, ?, ?, ?, ?)",
      [user_id, first_name, middle_name, last_name, relationship]
    );
  }
};

export default {
  confirmUserAccount,
  addMember,
};
