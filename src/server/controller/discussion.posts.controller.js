import query from "../db/utils";
import moment from "moment";

const postDiscussion = async (req) => {
  const { id } = req;

  const now = moment(); // Get the current date and time
  const formatted_time = now.format("YYYY-MM-DD HH:mm:ss");

  if (id) {
    const selected_post = await query("SELECT * FROM discussion WHERE id = ?", [
      id,
    ]);

    console.log("SELECTED POST", selected_post);

    if (selected_post[0]) {
      const start_date = moment(selected_post[0].start_date);
      const end_date = moment(selected_post[0].end_date);

      if (now.isBetween(start_date, end_date)) {
        return selected_post;
      } else {
        const next_post_id = selected_post[0].id + 1;

        const next_post = await query("SELECT * FROM discussion WHERE id = ?", [
          next_post_id,
        ]);

        if (next_post[0]) {
          const start_date = moment(next_post[0].start_date);
          const end_date = moment(next_post[0].end_date);

          if (now.isBetween(start_date, end_date)) {
            return next_post;
          }
        }
      }
    }
  }
};

export default {
  postDiscussion,
};
