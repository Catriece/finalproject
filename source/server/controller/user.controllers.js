import query from "../db/utils";
import bcrypt from "bcrypt";

// USER CAN UPDATE THEIR BIOGRAPHY
const updateBiography = async (req) => {
  const { id, biography } = req.body;

  // USER ABLE TO UPDATE BIOGRAPHY WITH CHARACTER COUNT LESS THAN 251
  if (id && biography.length < 251) {
    return await query("UPDATE users SET biography = ? WHERE id = ?", [
      biography,
      id,
    ]);
  } else {
    return null;
  }
};

const getBiography = async (req) => {
  const { id } = req;

  if (id) {
    return await query("SELECT biography FROM users WHERE id = ?", [id]);
  } else {
    return null;
  }
};

// UPDATING FIRST NAME

const updateFirstName = async (req) => {
  const { id, first_name } = req;

  // NAME UPDATE MUST BE A STRING TYPE AND NOT EMPTY

  if (
    typeof first_name === "string" &&
    first_name.trim() !== "" &&
    first_name.length < 51
  ) {
    // NAME IS UPDATED IF PREVIOUS CONDITIONS ARE MET

    return await query("UPDATE users SET first_name = ? WHERE id = ?", [
      first_name,
      id,
    ]);
  } else {
    throw new Error("Input valid name");
  }
};

const updateMiddleName = async (req) => {
  const { id, middle_name } = req;

  if (typeof middle_name === "string" && middle_name.length < 51) {
    return await query("UPDATE users SET middle_name = ? WHERE id = ?", [
      middle_name,
      id,
    ]);
  } else {
    return null;
  }
};

const updateLastName = async (req) => {
  const { id, last_name } = req;

  if (
    typeof last_name === "string" &&
    last_name.trim() !== "" &&
    last_name.length < 51
  ) {
    return await query("UPDATE users SET last_name = ? WHERE id = ?", [
      last_name,
      id,
    ]);
  } else {
    return null;
  }
};

const updateEmail = async (req) => {
  const { id, email } = req;

  if (typeof email === "string" && email.trim() !== "") {
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (emailRegex.test(email)) {
      return await query("UPDATE users SET email = ?, WHERE id = ?", [
        email,
        id,
      ]);
    } else {
      throw new Error("Invalid email formart");
    }
  } else {
    throw new Error("Email is required");
  }
};

const getEmail = async (checkEmail) => {
  if (checkEmail) {
    const username = await query(
      "SELECT username FROM users WHERE LOWER(email) = LOWER(?)",
      [checkEmail]
    );

    if (username.length > 0) {
      return username;
    } else {
      console.error("Username not found");
      return false;
    }
  } else {
    console.error("Email not available", error);
    return false;
  }
};

const updatePassword = async (req) => {
  const { username, password } = req.body;

  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    await query(
      "UPDATE users SET password = ?, salt = ? WHERE LOWER(username) = LOWER(?)",
      [hashedPassword, salt, username]
    );

    return true;
  } catch (err) {
    console.error("Trouble updating password", err);
  }
};

const getPassword = async (req) => {
  const { email, username } = req.query;

  if (req.query) {
    const response = await query(
      "SELECT id FROM users WHERE LOWER(email) = LOWER(?) AND LOWER(username) = LOWER(?)",
      [email, username]
    );

    if (response.length > 0) {
      return true;
    } else {
      return false;
    }
  } else {
    console.error("No parameters given", error);
  }
};

const findUser = async (req) => {
  const { email } = req.query;
  if (email) {
    const found_user = await query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);

    if (found_user.length > 0) {
      return true;
    } else {
      return false;
    }
  }
};

const updateUsername = async (req) => {
  const { checkUsername, id } = req.body;

  // UPDATE USERNAME IN DATABASE

  try {
    if (checkUsername) {
      const useable = await query(
        "SELECT username FROM users WHERE LOWER(username) = ?",
        [checkUsername.toLowerCase()]
      );

      if (useable.length === 0) {
        await query("UPDATE users SET username = ? WHERE id = ?", [
          checkUsername,
          id,
        ]);
        await query(
          "UPDATE family_relationships SET username = ? WHERE user_id = ?",
          [checkUsername, id]
        );
        await query(
          "UPDATE family_codes SET username = ? WHERE creator_id = ?",
          [checkUsername, id]
        );

        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.error("Error updating username:", error);
    return false;
  }
};

// Function checks to see if a username is already in use.

const findUsername = async (email) => {
  if (email) {
    const found_username = await query(
      "SELECT username FROM users WHERE LOWER(email) = LOWER(?)",
      [email]
    );
    return found_username;
  } else {
    throw new Error("Email not associated with an account");
  }
};

const getImage = async (req) => {
  const { id } = req.query;

  if (!id) {
    return false;
  } else {
    return await query(
      "SELECT id, profile_picture, first_name FROM users WHERE id = ?",
      [id]
    );
  }
};

export default {
  getImage,
  updateBiography,
  updateFirstName,
  updateMiddleName,
  updateLastName,
  updateEmail,
  updateUsername,
  updatePassword,
  findUser,
  findUsername,
  getBiography,
  getPassword,
  getEmail,
};
