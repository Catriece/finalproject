// FIX LINK TO PROFILE BASED ON USERS URL
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import AuthContext from "../../authContext";
import DiscussionPost from "../../components/discussionpost/discussion.post";
import UserJournalPost from "../../components/journalposts/journal.post";
import MemberComponent from "../../components/members/members.component";
import ProfilePicture from "../../components/images/profile.picture";
import SettingsIcon from "@mui/icons-material/Settings";
import "./dashboard.css";

const DashboardHomepage = () => {
  const { user, logout } = useContext(AuthContext);
  const [familyCircle, setFamilyCircle] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState("journal");
  const [clicked, setClicked] = useState("bg-red");
  const navigate = useNavigate();

  const { id } = useParams;

  useEffect(() => {
    if (user) {
      setIsLoaded(true);
      setFamilyCircle(user.user_info.family_circle);
    }
  }, [user]);

  const handleLogout = () => {
    if (logout) {
      navigate("/");
    }
  };

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

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="d-flex align-items-center justify-content-center vh-95">
      {
        <div className="div card">
          <div className="dash-nav">
            <Link
              to={`/account/settings/${id}`}
              style={{ fontSize: "small", color: "black" }}
            >
              <SettingsIcon />
            </Link>
            <button id="dash-lo-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div className="dash-img">
            <Link to={`/account/user/${user.user_info.user_id}`}>
              <ProfilePicture
                id={user.user_info.user_id}
                style={{
                  width: "130px",
                  height: "150px",
                  borderRadius: "50%",
                  padding: "3px",
                  border: "1.5px black solid",
                  margin: "auto",
                }}
              />
            </Link>
          </div>
          <div className="dash-heading">
            <h3 className="dash-heading">
              Welcome, <i>{user.user_info.name}</i>!
            </h3>
          </div>
          <p className="dash-header">Circle Members</p>
          <div className="center">
            <MemberComponent style={{ width: "95%" }} />
          </div>

          <div className="dash-btn-div">
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

          {showContent === "journal" && (
            <div>
              <UserJournalPost />
            </div>
          )}

          {showContent === "discussion" && (
            <div className="dash-discussion">
              <DiscussionPost />
            </div>
          )}
        </div>
      }
    </Container>
  );
};

export default DashboardHomepage;
