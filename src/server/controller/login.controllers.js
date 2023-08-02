import query from "../db/utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = "1222-0509-0722-0728";

const loginAuthentication = async (user_input) => {
  const { username, password } = user_input;
  console.log("USERNAME FROM LOGIN AUTHENTICATION", username);

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

    if (!password_match) {
      throw new Error("Invalid username or password");
    }

    if (password_match) {
      // GATHER THE USER'S INFORMATION

      const user = await query(
        `SELECT id, username, email, CONCAT (first_name, " ", middle_name, " ", last_name) AS name, first_name, middle_name, last_name, biography, password, salt, family_code, profile_picture, cover_photo FROM users WHERE username = ?`,
        [username]
      );

      const code = user[0].family_code;

      // THIS CODE GATHERS THE USER'S DEFAULT FAMILY CODE
      // BECAUSE THE USER CAN BE ATTACHED TO MULITPLE FAMILY CIRCLES, THE DEFAULT CIRCLE CODE IS THE FAMILY CIRCLE THEY FIRST JOINED OR THE FAMILY CIRCLE THEY FIRST CREATED
      // IN AN UPDATE, USER WILL BE ABLE TO CHANGE THEIR DEFAULT FAMILY CIRCLE

      // GATHER USER'S CIRCLE POSTS & CIRCLE'S COMMENTS

      const family_posts = await query(
        "SELECT * FROM posts WHERE family_code = ?",
        [code]
      );

      const family_post_comments = await query(
        "SELECT * FROM post_comments WHERE family_code = ?",
        [code]
      );

      // GATHER USER'S FAMILY CIRCLE
      const user_circle = await query(
        `SELECT CONCAT (first_name, " ", middle_name, " ", last_name) AS name, url, profile_picture FROM users WHERE family_code = ?`,
        [code]
      );

      const payload = {
        // GATHERING FAMILY POSTS
        entry: family_posts.family_posts,
        entry_timestamp: family_posts.timestamp,
        // GATHER FAMILY COMMENTS ON POSTS
        comment: family_post_comments.family_post_comments,
        comment_timestamp: family_post_comments.timestamp,
        // GATHERING FAMILY IN USERS CIRCLE
        circle_name: user_circle.name,
        family_url: user_circle.url,
        family_profile_picture: user_circle.profile_picture,
        // GATHERING USERS INFORMATION
        user_id: user[0].id,
        username: user[0].username,
        email: user[0].email,
        name: user[0].name,
        first_name: user[0].first_name,
        middle_name: user[0].middle_name,
        last_name: user[0].last_name,
        biography: user[0].biography,
        password: user[0].password,
        salt: user[0].salt,
        profile_picture: user[0].profile_picture,
        cover_photo: user[0].cover_photo,
        family_code: user[0].family_code,
      };

      const token = jwt.sign(payload, secretKey, {
        expiresIn: "1h",
      });
      return { payload, token };
    } else {
      throw new Error("Login failed: Invalid username or password");
    }
  }
};

export default {
  loginAuthentication,
};
