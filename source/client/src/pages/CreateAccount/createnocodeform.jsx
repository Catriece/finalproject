import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./createnocode.css";

const CreateNewAccountNewCircle = () => {
  const navigate = useNavigate();

  const [circleName, setCircleName] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [currentStep, setCurrentStep] = useState("username");
  const [checkUsername, setCheckUsername] = useState("");
  const [checkEmail, setCheckEmail] = useState("");
  const [confirmedUsername, setConfirmedUsername] = useState("");
  const [confirmedEmail, setConfirmedEmail] = useState("");
  const [alert, setAlert] = useState("false");

  const handleUsernameVerification = async (e) => {
    e.preventDefault();
    if (checkUsername) {
      axios
        .get("http://localhost:5050/api/create/newuser/verifyusername", {
          params: { checkUsername },
        })
        .then((res) => {
          if (res.status === 200 && res.data !== false) {
            setConfirmedUsername(res.data);
            setCurrentStep("email");
          } else if (res.data === false) {
            // CREATE A DISPLAY MESSAGE FUNCTION THAT SHOWS USERNAME ALREADY EXISTS
            setAlert("true");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const handleEmailVerification = async (e) => {
    e.preventDefault();
    if (checkEmail) {
      axios
        .get("http://localhost:5050/api/create/newuser/verifyemail", {
          params: { checkEmail },
        })
        .then((res) => {
          if (res.status === 200 && res.data !== false) {
            setConfirmedEmail(res.data);
            setCurrentStep("newUser");
          } else if (res.data === false) {
            // CREATE A DISPLAY MESSAGE FUNCTION THAT SHOWS USERNAME ALREADY EXISTS
            setAlert("warn");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //CREATE REQUEST BODY

    const user = {
      circle_name: circleName,
      username: checkUsername,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      email: checkEmail,
      password: password,
    };

    if (user) {
      axios
        .post("http://localhost:5050/api/create/newuser/newcircle", user)
        .then((res) => {
          if (res.data.name === "TypeError") {
            navigate("/");
            alert("Incorrect Username or Password");
          } else {
            navigate("/dashboard/:id");
          }
        });
    }

    setCircleName("");
    setUsername("");
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      {currentStep === "username" && (
        <div className="card">
          <Form
            className="nc-username-div"
            onSubmit={handleUsernameVerification}
          >
            <h3 className="name">My Family Circle</h3>
            <p className="signup">Sign Up</p>
            {alert === "true" && (
              <p className="warning">Username is already in use.</p>
            )}
            <label className="label">
              Username:
              <input
                type="text"
                placeholder="Username"
                autoComplete="username"
                className="cn-form-input input"
                autoFocus="autofocus"
                value={checkUsername}
                onChange={(e) => setCheckUsername(e.target.value)}
              />
            </label>

            <button className="form-submit-btn">Confirm Username</button>

            <p className="current-user">
              Already have an account? <a href="/">Log In</a>
            </p>
          </Form>
        </div>
      )}

      {currentStep === "email" && (
        <div className="card">
          <Form className="nc-username-div" onSubmit={handleEmailVerification}>
            <h3 className="name">My Family Circle</h3>
            <p className="signup">Sign Up</p>
            {alert === "warn" && (
              <p className="warning">
                Do you have an account? This email is already in use.
              </p>
            )}
            <label className="label">
              Email:
              <input
                type="email"
                placeholder="Email"
                autoComplete="email"
                className="cn-form-input input"
                autoFocus="autofocus"
                value={checkEmail}
                onChange={(e) => setCheckEmail(e.target.value)}
              />
            </label>

            <button className="form-submit-btn">Confirm Email</button>
            <p className="current-user">
              Already have an account? <a href="/">Log In</a>
            </p>
          </Form>
        </div>
      )}

      {currentStep === "newUser" && (
        <div className="card">
          <Form onSubmit={handleSubmit}>
            <h3 id="name">My Family Circle</h3>
            <p className="signup">Sign Up</p>
            <Form.Group>
              <div className="input-container">
                <Form.Label htmlFor="CircleName" className="label">
                  Circle Name:
                  <br />
                  <input
                    type="text"
                    id="CircleName"
                    className="input field"
                    autoComplete="circlename"
                    autoFocus="autofocus"
                    placeholder="Circle Name"
                    value={circleName}
                    onChange={(e) => setCircleName(e.target.value)}
                    required
                  />
                </Form.Label>

                <Form.Label htmlFor="first-name" className="first-name label">
                  First Name:
                  <br />
                  <input
                    type="text"
                    id="first-name"
                    className="input field"
                    autoComplete="firstname"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Form.Label>

                <Form.Label htmlFor="middle-name" className="middle-name label">
                  Middle Name:
                  <br />
                  <input
                    type="text"
                    id="middle-name"
                    className="input field"
                    autoComplete="middlename"
                    placeholder="Middle Name"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </Form.Label>

                <Form.Label htmlFor="last-name" className="last-name label">
                  Last Name:
                  <br />
                  <input
                    type="text"
                    id="last-name"
                    className="input field"
                    autoComplete="lastname"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Form.Label>

                <Form.Label htmlFor="password" className="password label">
                  Create Password:
                  <br />
                  <input
                    type="password"
                    id="password"
                    className="input field"
                    placeholder="Password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Label>
                <br />
              </div>
            </Form.Group>
            <div id="p-element">
              <p className="current-user">
                Already have an account? <a href="/">Log In</a>
              </p>
              <p className="current-user">
                Join a family circle <a href="/signup">here</a>
              </p>
            </div>

            <button className="form-submit-btn" type="submit">
              Sign up
            </button>
          </Form>
        </div>
      )}
    </Container>
  );
};

export default CreateNewAccountNewCircle;
