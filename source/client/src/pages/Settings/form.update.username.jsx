import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../authContext";
import "../AccountReset/forgot.credentials.css";

function UpdateUsernamePage() {
  const { user } = useContext(AuthContext);
  const [verified, setVerified] = useState("false");
  const [email, setEmail] = useState("");
  const [checkUsername, setCheckUsername] = useState("");
  const [available, setAvailable] = useState("false");
  const [invalidCred, setInvalidCred] = useState("false");
  const [currentUsername, setCurrentUsername] = useState(null);
  const [invalidUN, setInvalidUN] = useState("false");

  const navigate = useNavigate();

  // RETRIEVE USERS CURRENT USERNAME

  useEffect(() => {
    const user_id = user.user_info.user_id;
    try {
      const username = axios
        .post("http://localhost:5050/api/retrieve/username", { user_id })
        .then((username) => {
          if (username.status === 200 && username.data !== false) {
            setCurrentUsername(username.data[0].username);
          }
        });
    } catch (error) {
      console.error("Error fetching username", error);
    }
  }, [user]);

  // VERIFY EMAIL BEFORE USERNAME CHANGE

  const verifyUser = (e) => {
    e.preventDefault();

    try {
      if (user.user_info.email === email) {
        axios
          .get("http://localhost:5050/api/updateuser/finduser", {
            params: { email },
          })
          .then((res) => {
            if (res.status === 200 && res.data !== false) {
              setVerified("true");
            } else {
              setInvalidCred("true");
              setEmail("");
            }
          });
      } else {
        setInvalidCred("true");
        setEmail("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // FUNCTION FOR UPDATING A UNIQUE USERNAME

  const updateUsername = async (e) => {
    e.preventDefault();

    const info = {
      checkUsername: checkUsername,
      id: user.user_info.user_id,
    };

    try {
      const availability = await axios.get(
        "http://localhost:5050/api/create/newuser/verifyusername",
        {
          params: { checkUsername },
        }
      );

      if (availability.status === 200 && availability.data !== false) {
        setAvailable("true");
        setInvalidUN("false");

        try {
          if (available) {
            const update = await axios.put(
              "http://localhost:5050/api/updateuser/username",
              info
            );

            if (update.status === 200 && update.data !== false) {
              setVerified("success");
            } else {
            }
          }
        } catch (error) {
          console.error("Error updating username", error);
        }
      } else {
        setInvalidUN("show");
        setCheckUsername("");
      }
    } catch (error) {
      console.error("Error checking username availability", error);
    }
  };

  return (
    <>
      {verified === "false" && (
        <div className="">
          <form className="pw-form" onSubmit={verifyUser}>
            <h3 className="pw-header pw-app-name">My Family Circle</h3>
            <p className="pw-subheader">Update Username</p>
            {invalidCred === "true" && (
              <p className="pw-invalid-cred">Invalid email input.</p>
            )}
            <div className="pw-container">
              <label className="pw-email pw-label">
                Email:
                <input
                  type="email"
                  className="pw-email pw-form-input"
                  placeholder="Enter your email"
                  autoComplete="email"
                  autoFocus="autofocus"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <button id="pw-submit-btn">Verify</button>
          </form>
        </div>
      )}

      {verified === "true" && (
        <div className="">
          <form className="pw-form" onSubmit={updateUsername}>
            <h3 className="pw-header pw-app-name">My Family Circle</h3>
            <p className="pw-subheader">Update Username</p>
            <p className="pw-subheader">
              Current username: <b>{currentUsername}</b>
            </p>
            {invalidUN === "show" && (
              <p className="pw-invalid-cred">
                Sorry, this username is already in use.
              </p>
            )}
            <div className="pw-container">
              <p className="pw-password pw-label">
                New Username:
                <input
                  type="username"
                  className="pw-password pw-form-input"
                  autoComplete="username"
                  placeholder="Enter your new username"
                  autoFocus="autofocus"
                  value={checkUsername}
                  onChange={(e) => setCheckUsername(e.target.value)}
                />
              </p>
            </div>
            <button id="pw-submit-btn">Submit</button>
          </form>
        </div>
      )}
      {verified === "success" && (
        <div className="">
          <form className="un-form">
            <h3 className="pw-header-new pw-app-name">My Family Circle</h3>
            <p className="pw-subheader-new">Username Successfully Updated!</p>

            <button
              id="un-submit-btn-new"
              onClick={() => navigate("/dashboard/:id")}
            >
              Go to Dashboard
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default UpdateUsernamePage;
