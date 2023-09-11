import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Container } from "react-bootstrap";
import Box from "@mui/material/Box";
import UpdatePasswordPage from "./form.update.password";
import UpdateUsernamePage from "./form.update.username";
import UploadImage from "../../components/images/update.image";
import AuthContext from "../../authContext";
import "./settings.css";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `basic-tab-${index}`,
    "aria-controls": `basic-tabpanel-${index}`,
  };
}

export default function SettingsPage() {
  const [value, setValue] = React.useState(0);
  const [rendering, setRendering] = useState(null);
  const { user } = useContext(AuthContext);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (user) {
      setCode(user.user_info.family_code);
    }
  }, [user]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function renderPasswordPage(e) {
    setRendering(<UpdatePasswordPage />);
    let activeBtn = new Array(...e.target.classList);

    if (!activeBtn.includes("active")) {
      e.target.classList.toggle("active");
      document.getElementById("usernameBtn").classList.remove("active");
    }
  }

  function renderUsernamePage(e) {
    setRendering(<UpdateUsernamePage />);

    let activeBtn = new Array(...e.target.classList);

    if (!activeBtn.includes("active")) {
      e.target.classList.toggle("active");
      document.getElementById("passwordBtn").classList.remove("active");
    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <div
        className="card"
        style={{
          width: "350px",
          minHeight: "150px",
          padding: "15px",
          gap: "0px",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Basic tabs example"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <Tab label="Account" {...a11yProps(0)} />
              <Tab label="Profile" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            {
              <div className="dflex m4">
                <p>
                  FAMILY CODE: <b>{code}</b>
                </p>
                <button
                  id="passwordBtn"
                  onClick={renderPasswordPage}
                  style={{ borderRadius: "12px 0 0 12px" }}
                >
                  Update Password
                </button>
                <button
                  id="usernameBtn"
                  onClick={renderUsernamePage}
                  style={{ borderRadius: "0 12px 12px 0" }}
                >
                  Update Username
                </button>
              </div>
            }
            {rendering}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="dflex">
              <p>
                FAMILY CODE: <b>{code}</b>
                {<UploadImage />}
              </p>
            </div>
          </CustomTabPanel>
        </Box>

        <p className="un-link">
          Click <a href="/dashboard/:id">here</a> to go to your dashboard.
        </p>
      </div>
    </Container>
  );
}
