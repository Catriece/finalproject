import query from "../db/utils";
import bcrypt from "bcrypt";

const loginAuthentication = async (user_input) => {
  const { username, password } = user_input;
  console.log("USERNAME", username);

  if (username && password) {
    const db_password = await query(
      "SELECT password FROM users WHERE username = ?",
      [username]
    );

    if (db_password.length === 0) {
      throw new Error("Invalid username or password");
    }

    const password_match = await bcrypt.compare(
      password,
      db_password[0].password
    );

    if (password_match) {
      const user = await query("SELECT * FROM users WHERE username = ?", [
        username,
      ]);

      const user_info = {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
        first_name: user[0].first_name,
        middle_name: user[0].middle_name,
        last_name: user[0].last_name,
        biography: user[0].biography,
        role: user[0].role,
        password: user[0].password,
        salt: user[0].salt,
        profile_picture: user[0].profile_picture,
        cover_photo: user[0].cover_photo,
      };

      console.log("username", user_info);
      return user_info;
    } else {
      throw new Error("Invalid username or password");
    }
  }
};

export default {
  loginAuthentication,
};
