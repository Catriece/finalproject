import query from "../db/utils";
import bcrypt from "bcrypt";

const createEmail = async (user_input) => {
  const { email } = user_input;
  if (email) {
    const email_check = await query("SELECT email FROM users WHERE email = ?", [
      email,
    ]);

    if (email_check.length > 0) {
      console.log("Email already in use");
      return false;
    } else {
      console.log("Email is available");
      return email;
    }
  }
};

const searchUsername = async (user_input) => {
  const { username } = user_input;
  if (username) {
    const username_check = await query(
      "SELECT username FROM users WHERE username = ?",
      [username]
    );

    if (username_check.length > 0) {
      console.log("Username is not available");
      return false;
    } else {
      console.log("Username is available");
      return username;
    }
  }
};

const createUser = async (user_input) => {
  const { first_name, middle_name, last_name, username, email, password } =
    user_input;

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(password, salt);

  if (user_input) {
    return await query(
      "INSERT INTO users (first_name, middle_name, last_name, username, email, password) VALUES(?, ?, ?, ?, ?, ?)",
      [first_name, middle_name, last_name, username, email, hashedPassword]
    );
  } else {
    throw new Error("Error creating user:", error);
  }
};

export default {
  createEmail,
  searchUsername,
  createUser,
};
