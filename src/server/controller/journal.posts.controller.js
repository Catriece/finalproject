import query from "../db/utils";
import moment from "moment";

const createPost = async (user_input) => {
  const { id, post, family_code, url } = user_input;

  if (!post) {
    throw new Error("Post unsuccessful");
  } else {
    const timestamp = moment().format();

    await query(
      "INSERT INTO posts (user_id, entry, timestamp, family_code, media_url) VALUES (?, ?, ?, ?, ?)",
      [id, post, timestamp, family_code, url]
    );
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

export default {
  createPost,
  updatePost,
};
