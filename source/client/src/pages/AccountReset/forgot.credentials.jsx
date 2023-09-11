import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ForgotPasswordPage from "./form.forgot.password";
import ForgotUsernamePage from "./form.forgot.username";
import "./forgot.credentials.css";

const UpdateCredentialsPage = () => {
  const { id } = useParams();

  let componentToRender;

  if (id === "password") {
    componentToRender = <ForgotPasswordPage />;
  } else if (id === "username") {
    componentToRender = <ForgotUsernamePage />;
  } else {
    componentToRender = <div>Invalid ID</div>;
  }
  return <div>{componentToRender}</div>;
};

export default UpdateCredentialsPage;
