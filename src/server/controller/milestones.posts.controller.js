import query from "../db/utils";
import path from "path";
import moment from "moment";

const postMilestone = async (post) => {
  const {
    id,
    caption,
    url1,
    url2,
    url3,
    url4,
    url5,
    url6,
    url7,
    url8,
    url9,
    url10,
  } = post;

  if (post) {
    const validateMediaExt = (url) => {
      const ext_types = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".mp4",
        ".mov",
        ".wmv",
        ".webm",
      ];
      const ext = path.extname(url).toLowerCase();

      return ext_types.includes(ext);
    };

    // VALIDATE EACH URL
    const urls = [url1, url2, url3, url4, url5, url6, url7, url8, url9, url10];
    const valid_urls = urls.filter(validateMediaExt);
    // const invalid_urls = urls.filter((url) => !validateMediaExt(url));

    console.log("URLS VALID", valid_urls);
  }
};
