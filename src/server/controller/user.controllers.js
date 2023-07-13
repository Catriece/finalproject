import query from "../db/utils";

const updateProfilePicture = async (url) => {
  if (url) {
    return await query("UPDATE users SET profile_picture = ?", [url]);
  } else {
    return null;
  }
};

const deleteProfilePicture = async (url) => {
  return await query("DELETE FROM users WHERE profile_picture = ?", [url]);
};

const updateCoverPhoto = async (url) => {
  if (url) {
    return await query("UPDATE users SET cover_photo = ?", [url]);
  } else {
    return null;
  }
};

const deleteCoverPhoto = async (url) => {
  return await query("DELETE FROM users WHERE cover_photo = ?", [url]);
};

const updateBiography = async (req) => {
  if (req && req.length < 251) {
    return await query("UPDATE users SET biography = ?", [req]);
  } else {
    return null;
  }
};

const updateFirstName = async (req) => {
  if (typeof req === "string" && req.trim() !== "" && req.length < 51) {
    return await query("UPDATE users SET first_name = ?", [req]);
  } else {
    return null;
  }
};

const updateMiddleName = async (req) => {
  if (typeof req === "string" && req.length < 51) {
    return await query("UPDATE users SET middle_name = ?", [req]);
  } else {
    return null;
  }
};

const updateLastName = async (req) => {
  if (typeof req === "string" && req.trim() !== "" && req.length < 51) {
    return await query("UPDATE users SET last_name = ?", [req]);
  } else {
    return null;
  }
};

const updateEmail = async (req) => {
  if (typeof req === "string" && req.trim() !== "") {
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (emailRegex.test(req)) {
      return await query("UPDATE users SET email = ?", [req]);
    } else {
      throw new Error("Invalid email formart");
    }
  } else {
    throw new Error("Email is required");
  }
};

const updatePassword = async (req) => {
  if (req) {
    return await query("UPDATE users SET password = ?", [req]);
  } else {
    return null;
  }
};

export default {
  updateProfilePicture,
  updateCoverPhoto,
  updateBiography,
  updateFirstName,
  updateMiddleName,
  updateLastName,
  updateEmail,
  updatePassword,
  deleteCoverPhoto,
  deleteProfilePicture,
};
