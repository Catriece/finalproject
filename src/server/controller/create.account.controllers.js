import query from "../db/utils";
import bcrypt from "bcrypt";
import generateCircleCode from "../functions/generate.family.code";

// FUNCTION CHECKS TO SEE IF EMAIL IS IN USE

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

// FUNCTION CHECKS TO SEE IF USERNAME IS IN USE

const searchUsername = async (checkUsername) => {
  console.log("USERNAME GIVEN TO FUNCTION", checkUsername);
  if (checkUsername) {
    const username_check = await query(
      "SELECT username FROM users WHERE LOWER(username) = LOWER(?)",
      [checkUsername]
    );

    if (!username_check.length > 0) {
      console.log("Username is available");
      return checkUsername;
    } else {
      console.error("Username is not available");
      return false;
    }
  }
};

// FUNCTION LOCATES A FAMILY CODE

const searchFamilyCode = async (requestBody) => {
  console.log("MADE IT TO THE FUNCTION!");
  console.log("VERIFYING FAMILY CODE", requestBody);

  if (requestBody) {
    const find_code = await query(
      "SELECT circle_code FROM family_codes WHERE circle_code = ?",
      [requestBody]
    );

    console.log("find_code", find_code);

    if (find_code.length > 0) {
      return requestBody;
    } else {
      throw new Error("Invalid Family Code");
    }
  }
};

// FUNCTION ADDS NEW USER TO A FAMILY CIRCLE UPON ACCOUNT CREATION

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

  // SECURE PASSWORD CREATION

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    // VERIFIES FAMILY CODE INPUT

    const code_found = await query(
      "SELECT circle_code FROM family_codes WHERE circle_code = ?",
      [circle_code]
    );

    // USER ACCOUNT CREATED UPON VERIFICATION

    if (username && email && code_found) {
      await query(
        "INSERT INTO users (first_name, middle_name, last_name, family_code, username, email, password, salt) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
        [
          first_name,
          middle_name,
          last_name,
          circle_code,
          username,
          email,
          hashedPassword,
          salt,
        ]
      );

      console.log("New user created successfully");

      // FAMILY CIRCLE CREATOR INFO RETRIEVAL

      const circle_creator = await query(
        "SELECT creator_id, username FROM family_codes WHERE circle_code = ?",
        [circle_code]
      );

      // NEW USER TO BE ADDED INFO RETRIEVAL

      const new_user = await query(
        "SELECT id, username FROM users WHERE username = ?",
        [username]
      );

      // NEW USER ADDED TO FAMILY CIRCLE

      await query(
        "INSERT INTO family_relationships (user_id, username, family_id, circle_creator, relationship, family_code) VALUES (?, ?, ?, ?, ?, ?)",
        [
          new_user[0].id,
          new_user[0].username,
          circle_creator[0].creator_id,
          circle_creator[0].username,
          relationship,
          circle_code,
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
    // VERIFIES FAMILY CODE INPUT

    const code_found = await query(
      "SELECT circle_code FROM family_codes WHERE circle_code = ?",
      [circle_code]
    );

    if (code_found) {
      console.log("Family circle code located", code_found);

      // FAMILY CIRCLE CREATOR INFO RETRIEVAL

      const circle_creator = await query(
        "SELECT creator_id, username, circle_code FROM family_codes WHERE circle_code = ?",
        [circle_code]
      );

      // EXISTING USER TO BE ADDED INFO RETRIEVAL

      const existing_user = await query(
        "SELECT id, username FROM users WHERE username = ?",
        [username]
      );

      // EXISTING USER ADDED TO FAMILY CIRCLE

      await query(
        "INSERT INTO family_relationships (user_id, username, family_id, circle_creator, relationship, family_code) VALUES (?, ?, ?, ?, ?, ?)",
        [
          existing_user[0].id,
          existing_user[0].username,
          circle_creator[0].creator_id,
          circle_creator[0].username,
          relationship,
          circle_creator[0].circle_code,
        ]
      );

      console.log("ADDING USER SUCCESSFUL");
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

// NEW USER CREATES A NEW FAMILY CIRCLE AND A NEW ACCOUNT

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

  // SECURE PASSWORD CREATION

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(password, salt);

  // FAMILY CIRCLE CODE GENERATOR. CODE CAN BE SHARED WITH OTHERS TO ADD TO FAMILY CIRCLE

  let circle_code = generateCircleCode();
  console.log("CIRCLE CODE PROVIDED", circle_code);

  try {
    if (circle_code) {
      // LOOP CHECKS TO SEE IF CIRCLE CODE IS UNIQUE

      while (true) {
        const existingCode = await query(
          "SELECT circle_code FROM family_codes WHERE circle_code = ?",
          [circle_code]
        );

        // UNIQUE CODE ALLOWS FOR NEW USER TO CREATE A FAMILY CIRCLE AND A NEW ACCOUNT

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

          // RETRIEVE NEW USERS ID
          const user_id = await query("SELECT id FROM users WHERE email = ?", [
            email,
          ]);

          // ADD NEW USER INTO FAMILIAL RELATIONSHIPS TABLE. ALLOWS OWNER OF NEW CIRCLE TO BE ASSOCIATED WITH ALL USERS IN THEIR FAMILY CIRCLE.
          await query(
            "INSERT INTO family_relationships (user_id, username, family_id, circle_creator, relationship, family_code) VALUES (?, ?, ?, ?, ?, ?)",
            [user_id, username, user_id, username, "Owner", circle_code]
          );

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

// FUNCTION ALLOWS EXISTING USER TO CREATE A FAMILY CIRCLE

const createFamilyCircleForExistingUser = async (user_input) => {
  const { username, circle_name } = user_input;

  // GENERATED FAMILY CODE

  let circle_code = generateCircleCode();

  try {
    if (circle_code) {
      // LOOP TO CHECK IT CIRCLE CODE GENERATED IS UNIQUE

      while (true) {
        const existingCode = await query(
          "SELECT circle_code FROM family_codes WHERE circle_code = ?",
          [circle_code]
        );

        // EXISTING USER INFO GATHER TO BE ADDED INTO MYSQL DATABASE

        if (existingCode.length === 0) {
          const user = await query(
            "SELECT id, username FROM users WHERE username = ?",
            [username]
          );

          // LINKING GENERATED FAMILY CODE TO EXISTING USER

          if (user) {
            await query(
              "INSERT INTO family_codes (creator_id, username, circle_name, circle_code) VALUES (?, ?, ?, ?)",
              [user[0].id, user[0].username, circle_name, circle_code]
            );

            console.log("Family circle created successfully!");

            // ADD NEW USER INTO FAMILIAL RELATIONSHIPS TABLE. ALLOWS OWNER OF NEW CIRCLE TO BE ASSOCIATED WITH ALL USERS IN THEIR FAMILY CIRCLE.
            await query(
              "INSERT INTO family_relationships (user_id, username, family_id, circle_creator, relationship, family_code) VALUES (?, ?, ?, ?, ?, ?)",
              [
                user[0].id,
                user[0].username,
                user[0].id,
                user[0].username,
                "Owner",
                circle_code,
              ]
            );

            break;
          }
        } else {
          // IF CODE IS NOT UNIQUE, A NEW CODE IS GENERATED

          circle_code = generateCircleCode();
        }
      }
    }
  } catch (err) {
    throw new Error("Error creating family circle: " + err);
  }
};

export default {
  searchFamilyCode,
  searchEmail,
  searchUsername,
  AddNewUserToFamilyCircleWithCode,
  AddExistingUserToFamilyCircleWithCode,
  createFamilyCircleForNewUser,
  createFamilyCircleForExistingUser,
};
