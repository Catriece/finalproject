import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../authContext";
import Comments from "../comments/comments";
import "./discussionpost.css";

const DiscussionPost = () => {
  const { user } = useContext(AuthContext);
  const [discussionPost, setDiscussionPost] = useState("");
  const [discussionPostId, setDiscussionPostId] = useState(null);
  const [response, setResponse] = useState("");
  const [allResponses, setAllResponses] = useState([]);
  const [responseReceived, setResponseReceived] = useState(false);
  const [currentStep, setCurrentStep] = useState("");

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:5050/api/discussion/post")
        .then((res) => {
          if (res.data.name === "TypeError") {
            throw new Error("Trouble receiving today's discussion post.");
          } else {
            setDiscussionPost(res.data[0].question);
            setDiscussionPostId(res.data[0].id);
          }
        })

        .catch((err) => {
          throw new Error("Error fetching discussion post:", err);
        });
    }
  }, [user]);

  useEffect(() => {
    checkUserResponse();
  }, [discussionPostId]);

  const checkUserResponse = () => {
    const userId = user.user_info.user_id;
    const discussionId = discussionPostId;

    axios
      .get("http://localhost:5050/api/discussion/checkforresponse", {
        params: { userId, discussionId },
      })
      .then((res) => {
        if (res.data === true) {
          getAllResponses();
        } else {
          setCurrentStep("get-user-response");
        }
      });
  };

  const handleResponseSubmission = (e) => {
    e.preventDefault();

    const request_body = {
      post_id: discussionPostId,
      user_id: user.user_info.user_id,
      name: user.user_info.name,
      response: response,
      family_code: user.user_info.family_code,
    };

    axios
      .post("http://localhost:5050/api/discussion/response", request_body)
      .then((res) => {
        console.log("Response submitted:", res.data);
        if (res.status === 200 && res.status !== false) {
          setResponseReceived(true);
          getAllResponses(e);
        }
      })
      .catch((err) => {
        throw new Error("Error submitting response: ", err);
      });

    setResponse("");
  };

  const getAllResponses = () => {
    const code = user.user_info.family_code;
    const id = discussionPostId;

    axios
      .get("http://localhost:5050/api/discussion/getall/discussionresponses", {
        params: { id, code },
      })
      .then((res) => {
        console.log("HERE IS THE DATA I GET BACK", res.data);
        setAllResponses(res.data);
      });
  };

  useEffect(() => {
    if (allResponses.length > 0) {
      setCurrentStep("retrieve-all-members-responses");
    }
  }, [allResponses]);

  return (
    <div id="dp-div">
      {currentStep === "get-user-response" && (
        <form className="dp-form" onSubmit={handleResponseSubmission}>
          <div className="dp-form-group">
            <label class="dp-form-label" for="name">
              Discussion Post:
              <p class="dp-form-input"> {discussionPost}</p>
            </label>
          </div>
          <div class="dp-form-group">
            <label class="dp-form-label" for="message">
              Response:
              <textarea
                required=""
                placeholder="Enter your message"
                class="dp-form-input"
                name="message"
                id="message"
                value={response}
                onChange={(e) => {
                  setResponse(e.target.value);
                }}
              ></textarea>
            </label>
          </div>
          <button class="dp-form-button" type="submit">
            Submit
          </button>
        </form>
      )}
      {currentStep === "retrieve-all-members-responses" && (
        <div className="dp-form">
          <div className="dp-form-group">
            <label className="dp-form-label" htmlFor="name">
              Discussion Post:
              <p className="dp-form-input"> {discussionPost}</p>
            </label>
          </div>
          <div className="dp-all-posts dp-form-group coment-bottom bg-white p-2">
            {allResponses.map((response, index) => (
              <Comments
                key={response.id}
                image={response.profile_picture}
                name={response.name}
                timestamp={response.timestamp}
                content={response.response}
                id={`response${response.id}`}
                className={
                  index % 2 === 0
                    ? "commented-section-even"
                    : "commented-section-odd"
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionPost;
