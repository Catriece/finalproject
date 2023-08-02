import query from "../db/utils";
import moment from "moment";

const createComment = async (user_input) => {
  const { id, post_id, comment, comment_id, family_code, url } = user_input;

  if (!comment) {
    throw new Error("No comment to display");
  } else {
    const timestamp = moment().format();

    await query(
      "INSERT INTO post_comments (user_id, post_id, comment, comment_id, timestamp, family_code, media_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, post_id, comment, comment_id, timestamp, family_code, url]
    );
  }
};

const updateComment = async (user_input) => {
  const { comment, comment_id } = user_input;

  if (!comment) {
    throw new Error("Comment not updated");
  } else {
    const timestamp = moment().format();

    await query(
      "UPDATE post_comments SET comment = ?, timestamp = ?, WHERE id = ?",
      [comment, timestamp, comment_id]
    );
  }
};

export default {
  createComment,
  updateComment,
};
