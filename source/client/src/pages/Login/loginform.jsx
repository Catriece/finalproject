import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import AuthContext from "../../authContext";
import "./loginform.css";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  function submitForm(e) {
    e.preventDefault();

    if (username && password) {
      const user_credentials = {
        username,
        password,
      };

      // POST REQUEST USING LOGIN AUTHENTICATION CONTROLLERS IN SRC FOLDER

      axios
        .post("http://localhost:5050/api/user", user_credentials)
        .then((res) => {
          if (res.data.name === "TypeError") {
            navigate("/");
            alert("Incorrect Username or Password");
          } else {
            const { token, payload } = res.data;

            // TOKEN AND PAYLOAD IS STORED
            localStorage.setItem("token", token);

            login({ user_info: payload });

            //NAVIGATE TO THE DASHBOARD
            navigate(`/dashboard/${payload.user_id}`);
          }
        })
        .catch((err) => console.error(err));

      setUsername("");
      setPassword("");
    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <div className="card">
        <form id="form">
          <h3 id="liapp-name">My Family Circle</h3>
          <div id="li-credentials">
            <Form.Group controlId="username">
              <div className="label-container">
                <Form.Label className="username label">Username: </Form.Label>
              </div>
              <Form.Control
                type="text"
                className="input li-field"
                autoComplete="username"
                value={username}
                placeholder="username"
                autoFocus="autofocus"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group id="password">
              <div className="label-container">
                <Form.Label className="password label"> Password:</Form.Label>
              </div>
              <Form.Control
                type="password"
                className="li-field input"
                autoComplete="current-password"
                value={password}
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
          </div>
          <div className="btn-container">
            <Button id="btn" onClick={submitForm}>
              LOGIN
            </Button>
          </div>
          <div className="forgot-link-div">
            <a
              href="/accounts/updatecredentials/username"
              className="forgot-link"
            >
              forgot username
            </a>
            <br />
            <a
              href="/accounts/updatecredentials/password"
              className="forgot-link"
            >
              forgot password
            </a>
          </div>

          <div className="forgot-link-div">
            <span className="forgot-link">
              No account? Click <a href="/signup">here</a> to create one.
            </span>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;
