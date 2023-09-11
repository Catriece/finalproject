import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import AuthContext from "../../authContext";
import UserBiography from "../../components/biography/user.bio.component";
import UserJournalPost from "../../components/journalposts/journal.post";
import ProfilePicture from "../../components/images/profile.picture";
import DiscussionPost from "../../components/discussionpost/discussion.post";
import "./user.profile.css";

function FamilyCirclePages() {
  const { user, logout } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [familyMember, setFamilyMember] = useState(null);
  const [showContent, setShowContent] = useState("journal");
  const [clicked, setClicked] = useState("bg-red");

  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setIsLoaded(true);

      const members = user.user_info.family_circle;
      const found_member = members.find((member) => member.id === parseInt(id));

      if (found_member) {
        setFamilyMember(found_member);
      }
    }
  }, [user, id]);

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
    <Container className="d-flex align-items-center justify-content-center vh-100">
      {
        <div className="div card">
          <div className="dash-nav">
            <Link to={`/account/user/${user.user_info.user_id}`}>
              <ProfilePicture
                id={user.user_info.user_id}
                style={{
                  width: "1.95 rem",
                  height: "1.95rem",
                  borderRadius: "50%",
                }}
                className="fp-user-pic"
              />
            </Link>
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
          <div className="dash-img">
            <Link to={`/account/user/${familyMember.id}`}>
              <ProfilePicture
                id={familyMember.id}
                style={{
                  width: "100px",
                  height: "120px",
                  borderRadius: "50%",
                  padding: "3px",
                  border: "1.5px black solid",
                  margin: "auto",
                }}
                alt={familyMember.first_name}
              />
            </Link>
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
          <div id="profile-biography">
            <UserBiography id={id} />
          </div>
          {showContent === "journal" && (
            <div className="up-content">
              <UserJournalPost userId={id} />
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
}

export default FamilyCirclePages;
