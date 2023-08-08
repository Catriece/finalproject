import query from "../db/utils";
import moment from "moment";

const addComment = async (user_input) => {
  const { user_id, discussion_id, name, comment, family_code } = user_input;

  if (!user_input) {
    throw new Error("No comment to display");
  } else {
    const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");

    await query(
      "INSERT INTO discussion_comments (user_id, discussion_id, name, comment, timestamp, family_code) VALUES (?, ?, ?, ?, ?)",
      [user_id, discussion_id, name, comment, timestamp, family_code]
    );
  }
};

const updateComment = async (user_input) => {
  const { comment, comment_id } = user_input;

  if (!comment) {
    throw new Error("Comment not updated");
  } else {
    const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");

    await query(
      "UPDATE discussion_comments SET comment = ?, timestamp = ?, WHERE id = ?",
      [comment, timestamp, comment_id]
    );
  }
};

const getDiscussionPostComments = async (req) => {
  const { id, family_code } = req;

  if (req) {
    return await query(
      "SELECT user_id, timestamp, comment, family_code FROM discussion_comments WHERE discussion_id = ? AND family_code = ?",
      [id, family_code]
    );
  }
};

export default {
  addComment,
  updateComment,
  getDiscussionPostComments,
};
