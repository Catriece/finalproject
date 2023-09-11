import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import "./createwcode.css";

const CreateAccountWithCodePage = ({ verifiedCode }) => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState("usernameVerification");
  const [code, setCode] = useState(null);
  const [checkUsername, setCheckUsername] = useState("");
  const [confirmedUsername, setConfirmedUsername] = useState("");
  const [checkEmail, setCheckEmail] = useState("");
  const [confirmedEmail, setConfirmedEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [password, setPassword] = useState("");
  const [relationship, setRelationship] = useState("");
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
            setCurrentStep("emailVerification");
          } else if (res.data === false) {
            // CREATE A DISPLAY MESSAGE FUNCTION THAT SHOWS USERNAME ALREADY EXISTS
            setAlert("true");
            setCheckUsername("");
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
            setCheckEmail("");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const handleCreateNewUser = async (e) => {
    e.preventDefault();

    //CREATE REQUEST BODY

    setCode(verifiedCode);

    if (firstName && lastName && password && relationship) {
      const user = {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        family_code: code,
        username: confirmedUsername,
        email: confirmedEmail,
        password: password,
        relationship: relationship,
      };

      if (user) {
        axios
          .post("http://localhost:5050/api/create/newuser/joincircle", user)
          .then((res) => {
            if (res.data.name === "TypeError") {
              navigate("/signup");
            } else {
              navigate("/dashboard");
            }
          });
      }
    }

    setCheckUsername("");
    setConfirmedUsername("");
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setCheckEmail("");
    setConfirmedEmail("");
    setPassword("");
    setRelationship("");
    setCurrentStep("usernameVerification");
    setCode(null);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      {currentStep === "usernameVerification" && (
        <div className="card">
          <Form className="cn-form" onSubmit={handleUsernameVerification}>
            <h3 id="name">My Family Circle</h3>
            <p className="signup">Sign Up</p>
            {alert === "true" && (
              <p className="warning">Username is already in use.</p>
            )}
            <Form.Group>
              <div className="label-container">
                <Form.Label className="label">
                  Username:
                  <br />
                  <input
                    type="text"
                    placeholder="Username"
                    autofocus="autofocus"
                    className="input ifield"
                    value={checkUsername}
                    onChange={(e) => setCheckUsername(e.target.value)}
                  />
                </Form.Label>
              </div>
            </Form.Group>
            <div className="button-div">
              <button className="form-submit-btn">Confirm Username</button>
            </div>
            <p></p>
            <p className="current-user">
              Already have an account? <a href="/">Log In</a>
            </p>
          </Form>
        </div>
      )}

      {currentStep === "emailVerification" && (
        <div className="card">
          <Form className="cn-form" onSubmit={handleEmailVerification}>
            <h3 id="name">My Family Circle</h3>
            <p className="signup">Sign Up</p>
            {alert === "warn" && (
              <p className="warning">Email is already in use.</p>
            )}
            <Form.Group>
              <div className="label-container">
                <Form.Label className="label">
                  Email:
                  <br />
                  <input
                    type="email"
                    placeholder="Email"
                    className="input ifield"
                    autofocus="autofocus"
                    value={checkEmail}
                    onChange={(e) => setCheckEmail(e.target.value)}
                  />
                </Form.Label>
              </div>
            </Form.Group>
            <div className="button-div">
              <button className="form-submit-btn">Confirm Email</button>
            </div>
            <p></p>
            <p className="current-user">
              Already have an account? <a href="/">Log In</a>
            </p>
          </Form>
        </div>
      )}

      {currentStep === "newUser" && (
        <div className="card">
          <Form className="cn-form-fields" onSubmit={handleCreateNewUser}>
            <h3 id="name">My Family Circle</h3>
            <p className="signup">Sign Up</p>
            <Form.Group>
              <div className="label-container">
                <Form.Label htmlFor="relationship" id="relationship">
                  Select Relationship:
                  <select
                    name="Relationship"
                    className="cn-fields"
                    placeholder="Select Relationship"
                    defaultValue=" "
                    required
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                  >
                    <option disabled selected>
                      Choose One
                    </option>
                    <option value="great grandfather">Great Grandfather</option>
                    <option value="great grandmother">Great Grandmother</option>
                    <option value="grandfather">Grandfather</option>
                    <option value="grandmother">Grandmother</option>
                    <option value="father">Father</option>
                    <option value="mother">Mother</option>
                    <option value="brother">Brother</option>
                    <option value="sister">Sister</option>
                    <option value="uncle">Uncle</option>
                    <option value="aunt">Aunt</option>
                    <option value="cousin">Cousin</option>
                  </select>
                </Form.Label>
                <br />

                <Form.Label htmlFor="first-name" className="first-name label">
                  First Name:
                  <br />
                  <input
                    type="text"
                    id="first-name"
                    className="cn-input-fields"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Form.Label>

                <br />

                <Form.Label htmlFor="middle-name" className="middle-name label">
                  Middle Name:
                  <br />
                  <input
                    type="text"
                    id="middle-name"
                    className="cn-input-fields"
                    placeholder="Middle Name"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </Form.Label>
                <br />

                <Form.Label htmlFor="last-name" className="last-name label">
                  Last Name:
                  <br />
                  <input
                    type="text"
                    id="last-name"
                    className="cn-input-fields"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Form.Label>
                <br />
                <Form.Label htmlFor="password" className="password label">
                  Create Password:
                  <br />
                  <input
                    type="password"
                    id="password"
                    className="cn-input-fields"
                    placeholder="Password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Label>
              </div>
            </Form.Group>
            <div className="btn-container">
              <button className="cn-form-submit-btn">Sign Up</button>
            </div>
            <p className="current-user">
              Already have an account? <a href="/">Log In</a>
            </p>
            <p className="current-user">
              Create a new family circle <a href="/signup">here</a>
            </p>
          </Form>
        </div>
      )}
    </Container>
  );
};

export default CreateAccountWithCodePage;
