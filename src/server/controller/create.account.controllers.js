import query from "../db/utils";
import bcrypt from "bcrypt";
import generateCircleCode from "../functions/generate.family.code";

// Function checks to see if an email is already in use

const searchEmail = async (user_input) => {
  const { email } = user_input;
  if (email) {
    const email_check = await query(
      "SELECT email FROM users WHERE LOWER(email) = LOWER(?)",
      [email]
    );

    if (email_check.length > 0) {
      console.log("Email already in use");
      return false;
    } else {
      console.log("Email is available");
      return email;
    }
  }
};

// Function checks to see if a username is already in use.

const searchUsername = async (user_input) => {
  const { username } = user_input;
  if (username) {
    const username_check = await query(
      "SELECT username FROM users WHERE LOWER(username) = LOWER(?)",
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

// Function will add a new user to a family circle upon account creation

const AddNewUserToFamilyCircleWithCode = async (user_input) => {
  const {
    circle_code,
    first_name,
    middle_name,
    last_name,
    username,
    email,
    password,
    relationship,
  } = user_input;

  // Secure password creation

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    // Verify client's family code input

    const code_found = await query(
      "SELECT circle_code FROM family_codes WHERE circle_code = ?",
      [circle_code]
    );

    // If family code is verified, create user account

    if (code_found) {
      await query(
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

      console.log("New user created successfully");

      // Retrieve information from family circle creator

      const circle_creator = await query(
        "SELECT creator_id, username FROM family_codes WHERE circle_code = ?",
        [circle_code]
      );

      console.log("info from creator", circle_creator);

      // Retrieve information from new user to be added to family circle

      const new_user = await query(
        "SELECT id, username FROM users WHERE username = ?",
        [username]
      );

      console.log("info from new_user", new_user);

      // Add new user to family circle

      await query(
        "INSERT INTO family_relationships (user_id, username, family_id, circle_creator, relationship) VALUES (?, ?, ?, ?, ?)",
        [
          new_user[0].id,
          new_user[0].username,
          circle_creator[0].creator_id,
          circle_creator[0].username,
          relationship,
        ]
      );

      console.log("Family relationship established!");
    } else {
      throw new Error("Error creating user:", error);
    }
  } catch (err) {
    if (!circle_code) {
      throw new Error("Error! Family circle does not exist: " + err);
    } else {
      throw new Error("Error adding user to family circle: " + err);
    }
  }
};

const AddExistingUserToFamilyCircleWithCode = async (user_input) => {
  const { circle_code, username, relationship } = user_input;

  try {
    // Verify client's family code input

    const code_found = await query(
      "SELECT circle_code FROM family_codes WHERE circle_code = ?",
      [circle_code]
    );

    if (code_found) {
      console.log("Family circle code located", code_found);

      // Retrieve information from family circle creator

      const circle_creator = await query(
        "SELECT creator_id, username FROM family_codes WHERE circle_code = ?",
        [circle_code]
      );

      // Retrieve information from existing user to be added to family circle

      const existing_user = await query(
        "SELECT id, username FROM users WHERE username = ?",
        [username]
      );

      // Add exisiting user to family circle

      await query(
        "INSERT INTO family_relationships (user_id, username, family_id, circle_creator, relationship) VALUES (?, ?, ?, ?, ?)",
        [
          existing_user[0].id,
          existing_user[0].username,
          circle_creator[0].creator_id,
          circle_creator[0].username,
          relationship,
        ]
      );
    } else {
      throw new Error("Error creating user:", error);
    }
  } catch (err) {
    if (!circle_code) {
      throw new Error("Error! Family circle does not exist: " + err);
    } else {
      throw new Error("Error adding user to family circle: " + err);
    }
  }
};

// Function that allows New User to Create an Account and A Family Circle

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

  // Secure password creation

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(password, salt);

  // Family Circle Code Generation. Gives Circle Creators the ability to share code with others and add them to the circle

  let circle_code = generateCircleCode();
  console.log("CIRCLE CODE PROVIDED", circle_code);

  try {
    if (circle_code) {
      // While Loop checks to see if circle_code is unique to individual family

      while (true) {
        const existingCode = await query(
          "SELECT circle_code FROM family_codes WHERE circle_code = ?",
          [circle_code]
        );

        // Unique code allows for new user to create a family circle and an account

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

          console.log("New user created successfully");

          // New user information gathered to be added into family_codes table

          const user = await query(
            "SELECT id, username FROM users WHERE username = ?",
            [username]
          );

          // Family code and new user linked

          await query(
            "INSERT INTO family_codes (creator_id, username, circle_name, circle_code) VALUES (?, ?, ?, ?)",
            [user[0].id, user[0].username, circle_name, circle_code]
          );

          console.log("Family circle created successfully!");
          break;
        } else {
          // If code is not unique, new code is generated

          circle_code = generateCircleCode();
        }
      }
    }
  } catch (err) {
    throw new Error("Error creating family circle: " + err);
  }
};

// Function that allows an Existing User to Create a Family Circle

const createFamilyCircleForExistingUser = async (user_input) => {
  const { username, circle_name } = user_input;

  // Family Code is generated

  let circle_code = generateCircleCode();

  try {
    if (circle_code) {
      // While Loop checks to see if circle_code is unique to individual family

      while (true) {
        const existingCode = await query(
          "SELECT circle_code FROM family_codes WHERE circle_code = ?",
          [circle_code]
        );

        // existing user information gathered to be added into family_codes table

        if (existingCode.length === 0) {
          const user = await query(
            "SELECT id, username FROM users WHERE username = ?",
            [username]
          );

          // Family code and existing user linked

          if (user) {
            await query(
              "INSERT INTO family_codes (creator_id, username, circle_name, circle_code) VALUES (?, ?, ?, ?)",
              [user[0].id, user[0].username, circle_name, circle_code]
            );

            console.log("Family circle created successfully!");
            break;
          }
        } else {
          // If code is not unique, new code is generated

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
  AddNewUserToFamilyCircleWithCode,
  AddExistingUserToFamilyCircleWithCode,
  createFamilyCircleForNewUser,
  createFamilyCircleForExistingUser,
};
