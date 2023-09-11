import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import "./forgot.credentials.css";

function ForgotUsernamePage() {
  const [verified, setVerified] = useState("false");
  const [username, setUsername] = useState("");
  const [checkEmail, setCheckEmail] = useState("");
  const [credentials, setCredentials] = useState("false");

  const navigate = useNavigate();

  const getUsernameWithEmail = (e) => {
    e.preventDefault();

    try {
      axios
        .get("http://localhost:5050/api/updateuser/getemail", {
          params: { checkEmail },
        })
        .then((res) => {
          if (res.status === 200 && res.data !== false) {
            setUsername(res.data[0].username);
            setCredentials("username");
            setVerified("true");
          } else {
            setCheckEmail("");
            setCredentials("error");
            setVerified("false");
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      {verified === "false" && (
        <div className="card">
          <Form onSubmit={getUsernameWithEmail}>
            <button className="exitBtn" onClick={() => navigate("/")}>
              x
            </button>
            <h3 className="name">My Family Circle</h3>
            <p className="un-subheader">Forgot Username</p>
            {credentials === "error" && (
              <p className="un-invalid-cred">
                The email you've entered is invalid.
              </p>
            )}
            <div className="un-container">
              <p htmlFor="un-email" className="un-email un-label">
                Email:
                <input
                  type="email"
                  className="un-email-input un-form-input"
                  placeholder="Enter your email here"
                  autoFocus="autofocus"
                  autoComplete="email"
                  value={checkEmail}
                  onChange={(e) => setCheckEmail(e.target.value)}
                />
              </p>
            </div>
            <button id="un-submit-btn">Verify</button>
            <div>
              <p className="un-link">
                Actually, I{" "}
                <a
                  href="/accounts/updatecredentials/password"
                  className="forgot-link"
                >
                  forgot my password
                </a>
              </p>
              <p className="un-link">
                Already know your login? <a href="/">Click here</a>
              </p>
            </div>
          </Form>
        </div>
      )}
      {verified === "true" && (
        <div className="card">
          <form className="un-form">
            <button className="exitBtn" onClick={() => navigate("/")}>
              x
            </button>
            <h3 className="name">My Family Circle</h3>
            <p className="un-subheader-new">We found your username!</p>
            {credentials === "username" && (
              <p className="un-found">{username}</p>
            )}

            <button id="un-submit-btn-new" onClick={() => navigate("/")}>
              Go to Login Page
            </button>
          </form>
        </div>
      )}
    </Container>
  );
}

export default ForgotUsernamePage;
