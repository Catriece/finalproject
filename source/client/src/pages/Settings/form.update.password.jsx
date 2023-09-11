import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../AccountReset/forgot.credentials.css";

function UpdatePasswordPage() {
  const [verified, setVerified] = useState("false");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [invalidCred, setInvalidCred] = useState("false");
  const [invalidPW, setInvalidPW] = useState("false");

  const navigate = useNavigate();

  const verifyUser = (e) => {
    e.preventDefault();

    const info = {
      email: email,
      username: username,
    };

    try {
      axios
        .get("http://localhost:5050/api/updateuser/passwordreset", {
          params: info,
        })
        .then((res) => {
          if (res.status === 200 && res.data !== false) {
            setVerified("true");
          } else {
            setInvalidCred("true");
            setUsername("");
            setEmail("");
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  const updatePassword = (e) => {
    e.preventDefault();

    if (password !== verifyPassword) {
      setInvalidPW("true");
    } else {
      try {
        const info = {
          password: password,
          username: username,
        };

        axios
          .put("http://localhost:5050/api/updateuser/password", info)
          .then((res) => {
            if (res.status === 200 && res.data !== false) {
              setVerified("success");
            }
          })
          .catch((err) => console.error(err));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      {verified === "false" && (
        <div className="">
          <form className="pw-form" onSubmit={verifyUser}>
            <h3 className="pw-header pw-app-name">My Family Circle</h3>
            <p className="pw-subheader">Update Password</p>
            {invalidCred === "true" && (
              <p className="pw-invalid-cred">Invalid username and/or email.</p>
            )}
            <div className="pw-container">
              <p className="pw-email pw-label">
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
              </p>
              <p className="pw-username pw-label">
                Username:
                <input
                  type="text"
                  className="pw-username pw-form-input"
                  autoComplete="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </p>
            </div>
            <button id="pw-submit-btn">Verify</button>
          </form>
        </div>
      )}

      {verified === "true" && (
        <div className="">
          <form className="pw-form" onSubmit={updatePassword}>
            <button className="exitBtn" onClick={() => navigate("/")}>
              x
            </button>
            <h3 className="pw-header pw-app-name">My Family Circle</h3>
            <p className="pw-subheader">Forgot Password</p>
            {invalidPW === "true" && (
              <p className="pw-invalid-cred">Passwords do not match</p>
            )}
            <div className="pw-container">
              <p className="pw-password pw-label">
                New Password:
                <input
                  type="password"
                  className="pw-password pw-form-input"
                  autoComplete="password"
                  placeholder="Enter your new password"
                  autoFocus="autofocus"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </p>
              <p className="pw-password pw-label">
                Re-enter New Password:
                <input
                  type="password"
                  className="pw-password pw-form-input"
                  autoComplete="new-password"
                  placeholder="Reenter your new password"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                />
              </p>
            </div>
            <button id="pw-submit-btn">Submit</button>
            <div>
              <p className="pw-link">
                <a href="/dashboard/:id">Click here</a> to go to you dashbaord
              </p>
            </div>
          </form>
        </div>
      )}
      {verified === "success" && (
        <div className="">
          <form className="un-form">
            <button
              class="pw-exitbtn"
              onClick={() => navigate("/dashboard/:id")}
            >
              x
            </button>
            <h3 className="pw-header-new pw-app-name">My Family Circle</h3>
            <p className="pw-subheader-new">Password Successfully Reset!</p>

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

export default UpdatePasswordPage;
