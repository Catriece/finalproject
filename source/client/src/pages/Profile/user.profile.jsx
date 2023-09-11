import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import AuthContext from "../../authContext";
import UserBiography from "../../components/biography/user.bio.component";
import UserJournalPost from "../../components/journalposts/journal.post";
import ProfilePicture from "../../components/images/profile.picture";
import DiscussionPost from "../../components/discussionpost/discussion.post";

import "./user.profile.css";

const UserProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const [familyCircle, setFamilyCircle] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState("journal");
  const [clicked, setClicked] = useState("bg-red");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setIsLoaded(true);
      setFamilyCircle(user.user_info.family_circle);
    }
  }, [user]);

  const handleShowJournal = (e) => {
    setShowContent("journal");
    let redbtn = new Array(...e.target.classList);
    const btnId = e.target.id;
    setClicked(btnId);

    if (!redbtn.includes("bg-red")) {
      e.target.classList.toggle("bg-red");
      document.getElementById("db-mm").classList.remove("bg-red");
      document.getElementById("db-db").classList.remove("bg-red");
    }
  };

  const handleShowDiscussion = (e) => {
    setShowContent("discussion");
    let redbtn = new Array(...e.target.classList);
    const btnId = e.target.id;
    setClicked(btnId);

    if (!redbtn.includes("bg-red")) {
      e.target.classList.toggle("bg-red");
      document.getElementById("db-mm").classList.remove("bg-red");
      document.getElementById("db-jp").classList.remove("bg-red");
    }
  };

  const handleShowMemories = (e) => {
    setShowContent("memories");
    let redbtn = new Array(...e.target.classList);
    const btnId = e.target.id;
    setClicked(btnId);
    if (!redbtn.includes("bg-red")) {
      e.target.classList.toggle("bg-red");
      document.getElementById("db-db").classList.remove("bg-red");
      document.getElementById("db-jp").classList.remove("bg-red");
    }
  };

  const handleLogout = () => {
    if (logout) {
      navigate("/");
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      {
        <div className="div card">
          <div id="up-dash-btn-div">
            <button
              onClick={() =>
                navigate(`/dashboard/${user.user_info.user_id.toString()}`)
              }
              className="up-dash-btn"
            >
              Dashboard
            </button>
            <button className="up-lo-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div className="dash-nav">
            <Link to={`/account/user/${user.user_info.user_id}`}>
              <ProfilePicture
                id={user.user_info.user_id}
                style={{
                  width: "130px",
                  height: "150px",
                  borderRadius: "50%",
                  padding: "3px",
                  border: "1.5px black solid",
                }}
              />
            </Link>
          </div>
          <div id="up-nav">
            <button
              id="db-jp"
              className="db-btn bg-red left"
              onClick={handleShowJournal}
            >
              My Journal
            </button>
            <button
              id="db-db"
              className="db-btn middle"
              onClick={handleShowDiscussion}
            >
              Discussion Board
            </button>
            <button
              id="db-mm"
              className="db-btn right"
              onClick={handleShowMemories}
            >
              My Memories
            </button>
          </div>
          <div id="profile-biography">
            <UserBiography id={user.user_info.user_id} />
          </div>
          {showContent === "journal" && (
            <div className="up-content">
              <UserJournalPost />
            </div>
          )}

          {showContent === "discussion" && (
            <div className="up-content">
              <DiscussionPost />
            </div>
          )}
        </div>
      }
    </Container>
  );
};

export default UserProfilePage;
