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

const getAllPostResponses = async (req) => {
  const { code, id } = req.query;

  if (req.query) {
    const responses = await query(
      "SELECT dr.id, dr.user_id, dr.discussion_post_id, dr.name, dr.response, dr.timestamp, u.profile_picture FROM discussion_responses AS dr JOIN users AS u ON dr.user_id = u.id WHERE dr.family_code = ? AND dr.discussion_post_id = ? ORDER BY dr.timestamp DESC;",
      [code, id]
    );

    return responses;
  } else {
    console.error(error);
    return false;
  }
};

const checkForResponse = async (req) => {
  const { userId, discussionId } = req.query;
  console.log("HERE IS THE REQUEST QUERY INSIDE THE FUNCTION", req.query);

  if (req.query) {
    const responded = await query(
      "SELECT * FROM discussion_responses WHERE user_id = ? AND discussion_post_id = ?",
      [userId, discussionId]
    );

    if (responded.length > 0) {
      return true;
    } else {
      return false;
    }
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
  getAllPostResponses,
  checkForResponse,
};
