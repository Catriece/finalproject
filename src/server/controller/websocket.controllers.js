import query from "../db/utils";

const findFamilyCircleMembers = async (family_code) => {
  try {
    const members = await query(
      "SELECT * FROM family_relationships WHERE family_code = ?",
      [family_code]
    );

    return members;
  } catch (err) {
    next(err);
  }
};

const updateProfilePicture = async (ws, req) => {
  const { id, url } = req;

  if (url) {
    //VALIDATES URL LINK BASED ON EXTENSION NAME

    const validateImgExt = (url) => {
      const ext_types = [".jpg", ".jpeg", ".png", ".gif"];
      const ext = path.extname(url).toLowerCase();
      return ext_types.includes(ext);
    };

    const extIsValid = validateImgExt(url);

    // UPDATES THE PROFILE PICTURE LINK IN THE DATABASE OR THROWS AN ERROR

    if (extIsValid) {
      return await query("UPDATE users SET profile_picture = ? WHERE id = ?", [
        url,
        id,
      ]);
    } else {
      throw new Error(
        "Invalid picture formart. Upload a .jpg, .jpeg, .png, or .gif file only"
      );
    }
  } else if (!url) {
    throw new Error("Image link is required for update");
  }
};

const updateCoverPhoto = async (req) => {
  const { id, url } = req;

  if (url) {
    //VALIDATES URL LINK BASED ON EXTENSION NAME

    const validateImgExt = (url) => {
      const ext_types = [".jpg", ".jpeg", ".png"];
      const ext = path.extname(url).toLowerCase();
      return ext_types.includes(ext);
    };

    const extIsValid = validateImgExt(url);

    // UPDATES THE USERS COVER PHOTO LINK WITHIN THE DATABASE OR THROWS AN ERROR

    if (extIsValid) {
      return await query("UPDATE users SET cover_photo = ? WHERE id = ?", [
        url,
        id,
      ]);
    } else {
      throw new Error(
        "Invalid picture formart. Upload a .jpg, .jpeg, or .png file only"
      );
    }
  } else {
    throw new Error("Image link is required for update");
  }
};

export default {
  findFamilyCircleMembers,
  updateProfilePicture,
  updateCoverPhoto,
};
