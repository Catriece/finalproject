import query from "../db/utils";

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

  if (user_input) {
    return await query(
      "INSERT INTO users (first_name, middle_name, last_name, username, email, password) VALUES(?, ?, ?, ?, ?, ?)",
      [first_name, middle_name, last_name, username, email, password]
    );
  }
};

export default {
  createEmail,
  searchUsername,
  createUser,
};
