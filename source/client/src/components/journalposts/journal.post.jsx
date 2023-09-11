import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../authContext";
import Comments from "../comments/comments";
import ResizableTextArea from "../textarea/resizeableta";
import "./journalpost.css";

const UserJournalPost = ({ style }) => {
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [showPosts, setShowPosts] = useState("false");
  const [potentialDelete, setPotentialDelete] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    if (user) {
      const fetchUserPost = async () => {
        try {
          const info = {
            id: user.user_info.user_id,
            code: user.user_info.family_code,
          };

          axios
            .get("http://localhost:5050/api/journal/getallposts", {
              params: info,
            })
            .then((res) => {
              setUserPosts(res.data);
              setShowPosts("true");
            })
            .catch((err) => console.error("Error fetching user posts:", err));
        } catch (err) {
          console.error(err);
        }
      };
      fetchUserPost();
    }
  }, [user]);

  const handlePostSubmission = (e) => {
    e.preventDefault();

    if (post) {
      const info = {
        id: user.user_info.user_id,
        post: post,
        family_code: user.user_info.family_code,
        url: null,
      };

      axios
        .post("http://localhost:5050/api/journal/newpost", info)
        .then((res) => {
          if (res.status === 200 && res.data === true) {
            setPost("");
          } else {
            console.error((err) => console.error("Post unsuccessful", err));
          }
        })
        .catch((err) => console.error("Post unsuccessful", err));
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/journal/deletepost?post_id=${postId}`
      );

      if (response.status === 200 && response.data !== false) {
        await fetchPosts();
      }
    } catch (err) {
      console.error("Error deleting post", err);
    }
  };

  const fetchPosts = async () => {
    try {
      const info = {
        id: user.user_info.user_id,
        code: user.user_info.family_code,
      };

      const response = await axios.get(
        "http://localhost:5050/api/journal/getallposts",
        {
          params: info,
        }
      );

      if (response.status === 200 && response.data !== false) {
        setUserPosts(response.data);
        setShowPosts("true");
      }
    } catch (err) {
      console.error("Error fetching user posts:", err);
    }
  };

  return (
    <div>
      {id == user.user_info.user_id && (
        <form className="jp-form" onSubmit={handlePostSubmission}>
          <div className="jp-form-group">
            <label className="jp-form-label" htmlFor="message">
              <ResizableTextArea
                placeholder={`What's on your mind, ${user.user_info.first_name}?`}
                className={"jp-form-input"}
                value={post}
                onChange={(e) => setPost(e.target.value)}
              />
            </label>
            <button className="jp-form-button" type="submit">
              Submit
            </button>
          </div>
        </form>
      )}
      <br />
      {showPosts === "true" && (
        <div className="jp-form-group jp-all-posts">
          {userPosts.map((res, index) => (
            <Comments
              key={res.family_code + res.id}
              name={res.name}
              image={res.profile_picture}
              timestamp={res.timestamp}
              content={res.entry}
              id={index}
              onClick={() => handleDeletePost(res.id)}
              className={res.user_id}
              postId={res.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserJournalPost;
