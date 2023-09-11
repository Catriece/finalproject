import query from "../db/utils";
import moment from "moment";

const createPost = async (user_input) => {
  const { id, post, family_code, url } = user_input;
  if (!post) {
    throw new Error("Post unsuccessful");
    return false;
  } else {
    const timestamp = moment().format();
    await query(
      "INSERT INTO posts (user_id, entry, timestamp, family_code, media_url) VALUES (?, ?, ?, ?, ?)",
      [id, post, timestamp, family_code, url]
    );

    return true;
  }
};

const getUsersPosts = async (req) => {
  const { code, id } = req.query;

  if (req.query) {
    const responses = await query(
      "SELECT p.*, CONCAT(u.first_name, ' ', u.middle_name, ' ', u.last_name) AS name, u.profile_picture FROM posts AS p INNER JOIN users AS u ON p.user_id = u.id WHERE p.family_code = ? AND p.user_id = ? ORDER BY timestamp DESC",
      [code, id]
    );

    return responses;
  } else {
    console.error(error);
    return false;
  }
};

const getFamilyCirclesPosts = async (req) => {
  const { code } = req.query;

  if (code) {
    const allResponses = await query(
      "SELECT p.*, CONCAT(u.first_name, ' ', u.middle_name, ' ', u.last_name) AS name, u.profile_picture FROM posts AS p INNER JOIN users AS u ON p.user_id = u.id WHERE p.family_code = ? ORDER BY timestamp DESC",
      [code]
    );

    return allResponses;
  } else {
    console.error(error);
    return false;
  }
};

const updatePost = async (user_input) => {
  const { post, post_id } = user_input;

  if (!post) {
    throw new Error("Post unsuccessful");
  } else {
    const timestamp = moment().format();

    await query("UPDATE posts SET entry = ?, timestamp = ? WHERE id = ?", [
      post,
      timestamp,
      post_id,
    ]);
  }
};

const deletePost = async (req) => {
  const { post_id } = req.query;
  if (!post_id) {
    console.error("Error deleting post", error);
    return false;
  } else {
    await query("DELETE FROM posts WHERE id = ?", [post_id]);
  }
};

export default {
  createPost,
  updatePost,
  getUsersPosts,
  getFamilyCirclesPosts,
  deletePost,
};
