import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./entercode.form.css";
import CreateAccountWithCodePage from "./creatwcodeform";
import { Container, Form, Button } from "react-bootstrap";

const CodeVerificationForm = () => {
  const navigate = useNavigate();

  const [familyCode1, setFamilyCode1] = useState("");
  const [familyCode2, setFamilyCode2] = useState("");
  const [familyCode3, setFamilyCode3] = useState("");
  const [familyCode4, setFamilyCode4] = useState("");
  const [familyCode5, setFamilyCode5] = useState("");
  const [familyCode6, setFamilyCode6] = useState("");
  const [areFieldsFilled, setAreFieldsFilled] = useState(false);
  const [verifiedCode, setVerifiedCode] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const allFieldsFilled =
      familyCode1 &&
      familyCode2 &&
      familyCode3 &&
      familyCode4 &&
      familyCode5 &&
      familyCode6;

    setAreFieldsFilled(allFieldsFilled);
  }, [
    familyCode1,
    familyCode2,
    familyCode3,
    familyCode4,
    familyCode5,
    familyCode6,
  ]);

  const handleVerification = async (e) => {
    e.preventDefault();

    const requestBody =
      familyCode1 +
      familyCode2 +
      familyCode3 +
      familyCode4 +
      familyCode5 +
      familyCode6;

    if (requestBody) {
      axios
        .post("http://localhost:5050/api/create/newuser/verifycode", {
          requestBody,
        })
        .then((res) => {
          if (res.status === 200 && res.data !== false) {
            setFamilyCode1("");
            setFamilyCode2("");
            setFamilyCode3("");
            setFamilyCode4("");
            setFamilyCode5("");
            setFamilyCode6("");
            setVerifiedCode(res.data);
            navigate("/createaccount");
          } else {
            setErrorMsg("show");
            setFamilyCode1("");
            setFamilyCode2("");
            setFamilyCode3("");
            setFamilyCode4("");
            setFamilyCode5("");
            setFamilyCode6("");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <Container>
      {verifiedCode ? (
        <CreateAccountWithCodePage verifiedCode={verifiedCode} />
      ) : (
        <Form className="otp-Form" onSubmit={handleVerification}>
          <button className="x-btn" onClick={() => navigate("/")}>
            X
          </button>
          <div className="heading">
            <h3 className="mainHeading">Enter Circle Code</h3>
            <p className="otpSubheading">
              Enter the code to verify the family circle you wish to join.
            </p>
          </div>

          {errorMsg === "show" && (
            <p className="otp-errormsg">An invalid code was entered.</p>
          )}

          <Form.Group controlId="code">
            <div className="inputContainer">
              <input
                type="text"
                id="otp-input1"
                className="otp-input"
                required
                maxLength="1"
                autoFocus="autofocus"
                value={familyCode1}
                onChange={(e) => setFamilyCode1(e.target.value.toUpperCase())}
              />
              <input
                type="text"
                id="otp-input2"
                className="otp-input"
                required
                maxLength="1"
                value={familyCode2}
                onChange={(e) => setFamilyCode2(e.target.value.toUpperCase())}
              />
              <input
                type="text"
                id="otp-input3"
                className="otp-input"
                required
                maxLength="1"
                value={familyCode3}
                onChange={(e) => setFamilyCode3(e.target.value.toUpperCase())}
              />
              <input
                type="text"
                id="otp-input4"
                className="otp-input"
                required
                maxLength="1"
                value={familyCode4}
                onChange={(e) => setFamilyCode4(e.target.value.toUpperCase())}
              />
              <input
                type="text"
                id="otp-input5"
                className="otp-input"
                required
                maxLength="1"
                value={familyCode5}
                onChange={(e) => setFamilyCode5(e.target.value.toUpperCase())}
              />
              <input
                type="text"
                id="otp-input6"
                className="otp-input"
                required
                maxLength="1"
                value={familyCode6}
                onChange={(e) => setFamilyCode6(e.target.value.toUpperCase())}
              />
            </div>
          </Form.Group>

          <Button
            className="verifyButton btn"
            type="submit"
            disabled={!areFieldsFilled}
          >
            Verify
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default CodeVerificationForm;

// Potential Updates
// Upon verification, give new user the chance to accept or reject the family circle their code connected them to.
// Example:
// Code is verified
// Prompt user: Do you wish to join [Owner]'s Family Circle?
