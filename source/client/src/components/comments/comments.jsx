import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./commentscomp.css";
import moment from "moment";
import AuthContext from "../../authContext";

const Comments = ({
  name,
  timestamp,
  content,
  image,
  onClick,
  style,
  className,
  postId,
}) => {
  const [comment, setComment] = useState("false");
  const formattedTimestamp = moment(timestamp).format("MM/DD/YYYY hh:mm A");
  const { user } = useContext(AuthContext);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(user.user_info.user_id.toString());
  }, [user]);

  const handleCommentClick = (e) => {
    if (comment === "false") {
      setComment("true");
    } else {
      setComment("false");
    }
  };

  return (
    <div className="cmm-div">
      <div className="container">
        <div className="cmm-row">
          <div className="cmm-grid">
            <div className="cmm-card">
              <div className="cmm-card-body">
                <div className="cmm-user">
                  <img
                    className="cmm-img"
                    src={image}
                    alt={name}
                    width="60"
                    height="60"
                  />
                  <div>
                    <h6 className="cmm-name">{name}</h6>
                    <p className="cmm-timestamp">{formattedTimestamp}</p>
                  </div>
                  {userId == className && (
                    <button
                      onClick={onClick}
                      className={className}
                      style={{
                        borderRadius: "50%",
                        top: "-11px",
                        right: "-13px",
                        marginTop: "0",
                        width: "19px",
                        padding: "2px",
                        border: "1px gray solid",
                      }}
                    >
                      x
                    </button>
                  )}
                </div>

                <p className="cmm-post">{content}</p>

                <div className="cmm-interact small">
                  <button
                    onClick={handleCommentClick}
                    className="cmm-cmm-link mb-0"
                  >
                    Comment
                  </button>
                </div>
              </div>
              {comment === "true" && (
                <div className="card-footer">
                  <div className="cmm-respond">
                    <img
                      className="cmm-small-img"
                      src={image}
                      alt={user}
                      width="40"
                      height="40"
                    />
                    <div className="form-outline">
                      <textarea
                        className="cmm-reply-form"
                        id="textAreaExample"
                        rows="4"
                        autoFocus="autofocus"
                      ></textarea>
                      <label className="cmm-form-label" for="textAreaExample">
                        Message
                      </label>
                    </div>
                  </div>
                  <div className="cmm-btn-div">
                    <button type="button" className="cmm-btn btn-primary">
                      Post comment
                    </button>
                    <button
                      type="button"
                      className="cmm-btn btn-outline-primary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
