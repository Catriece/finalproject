import query from "../db/utils";
import bcrypt from "bcrypt";
import generateCircleCode from "../functions/generate.family.code";

const searchEmail = async (user_input) => {
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
      "INSERT INTO users (first_name, middle_name, last_name, username, email, password, salt) VALUES(?, ?, ?, ?, ?, ?, ?)",
      [
        first_name,
        middle_name,
        last_name,
        username,
        email,
        hashedPassword,
        salt,
      ]
    );
  } else {
    throw new Error("Error creating user:", error);
  }
};

const createFamilyCircleForNewUser = async (user_input) => {
  const {
    circle_name,
    first_name,
    middle_name,
    last_name,
    username,
    email,
    password,
  } = user_input;

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(password, salt);

  let circle_code = generateCircleCode();
  console.log("CIRCLE CODE PROVIDED", circle_code);

  try {
    if (circle_code) {
      while (true) {
        const existingCode = await query(
          "SELECT circle_code FROM family_codes WHERE circle_code = ?",
          [circle_code]
        );

        if (existingCode.length === 0) {
          await query(
            "INSERT INTO users (first_name, middle_name, last_name, username, email, password, salt) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
              first_name,
              middle_name,
              last_name,
              username,
              email,
              hashedPassword,
              salt,
            ]
          );

          const user_id = await query(
            "SELECT id FROM users WHERE username = ?",
            [username]
          );

          await query(
            "INSERT INTO family_codes (creator_id, circle_name, circle_code) VALUES (?, ?, ?)",
            [user_id[0].id, circle_name, circle_code]
          );

          console.log("Family circle created successfully!");
          break;
        } else {
          circle_code = generateCircleCode();
        }
      }
    }
  } catch (err) {
    throw new Error("Error creating family circle: " + err);
  }
};

const createFamilyCircleForExistingUser = async (user_input) => {
  const { username, circle_name } = user_input;

  let circle_code = generateCircleCode();

  try {
    if (circle_code) {
      while (true) {
        const existingCode = await query(
          "SELECT circle_code FROM family_codes WHERE circle_code = ?",
          [circle_code]
        );

        if (existingCode.length === 0) {
          const user = await query(
            "SELECT id, username FROM users WHERE username = ?",
            [username]
          );

          if (user) {
            await query(
              "INSERT INTO family_codes (creator_id, circle_name, circle_code) VALUES (?, ?, ?)",
              [user[0].id, circle_name, circle_code]
            );

            console.log("Family circle created successfully!");
            break;
          }
        } else {
          circle_code = generateCircleCode();
        }
      }
    }
  } catch (err) {
    throw new Error("Error creating family circle: " + err);
  }
};

export default {
  searchEmail,
  searchUsername,
  createUser,
  createFamilyCircleForNewUser,
  createFamilyCircleForExistingUser,
};
