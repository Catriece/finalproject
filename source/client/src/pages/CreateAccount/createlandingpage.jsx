import React, { useState } from "react";
import CodeVerificationForm from "./entercode.form";
import CreateNewAccountNewCircle from "./createnocodeform";
import { Container, Button } from "react-bootstrap";
import "./landingpage.css";

function CreateAccountLandingPage() {
  const [currentStep, setCurrentStep] = useState(null);

  const handleJoinExisitingCircle = () => {
    setCurrentStep("joinExisting");
  };

  const handleCreateNewCircle = () => {
    setCurrentStep("createNew");
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      {currentStep === null && (
        <div className="card">
          <h3 id="app-name">My Family Circle</h3>
          <div className="btn-container">
            <Button className="btn" onClick={handleCreateNewCircle}>
              Create New Circle
            </Button>
            <p></p>
            <Button className="btn" onClick={handleJoinExisitingCircle}>
              Join Exisiting Circle
            </Button>
          </div>
          <p className="current-user">
            Already have an account? <a href="/">Log In</a>
          </p>
        </div>
      )}

      {currentStep === "createNew" && (
        <div className="form-divs">
          <CreateNewAccountNewCircle id="form" />
        </div>
      )}
      {currentStep === "joinExisting" && (
        <div className="form-divs">
          <CodeVerificationForm id="form" />
        </div>
      )}
    </Container>
  );
}

export default CreateAccountLandingPage;
