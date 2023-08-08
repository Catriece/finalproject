import query from "../db/utils";
import moment from "moment";

const getDiscussionPost = async (req) => {
  const now = moment(); // Get the current date and time
  const formatted_time = now.format("YYYY-MM-DD HH:mm:ss");

  if (req) {
    return await query(
      "SELECT id, question FROM discussion WHERE start_date <= ? AND end_date >= ? ORDER BY start_date DESC LIMIT 1",
      [formatted_time, formatted_time]
    );
  }
};

const postResponse = async (req) => {
  const { post_id, user_id, name, response, family_code } = req;

  if (!req) {
    throw new Error("No response given");
  } else {
    const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");

    return await query(
      "INSERT INTO discussion_responses (discussion_post_id, user_id, name, response, timestamp, family_code) VALUES (?, ?, ?, ?, ?, ?)",
      [post_id, user_id, name, response, timestamp, family_code]
    );
  }
};

export default {
  getDiscussionPost,
  postResponse,
};
