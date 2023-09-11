import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAccountLandingPage from "./pages/CreateAccount/createlandingpage";
import LoginPage from "./pages/Login/loginpage";
import UpdateCredentialsPage from "./pages/AccountReset/forgot.credentials";
import DashboardHomepage from "./pages/Dashboard/dashboard";
import UserProfilePage from "./pages/Profile/user.profile";
import FamilyCirclePages from "./pages/Profile/family.profile";
import CodeVerificationForm from "./pages/CreateAccount/entercode.form";
import CreateAccountWithCodePage from "./pages/CreateAccount/creatwcodeform";
import SettingsPage from "./pages/Settings/settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/verify" element={<CodeVerificationForm />} />
        <Route path="/signup" element={<CreateAccountLandingPage />} />
        <Route path="/createaccount" element={<CreateAccountWithCodePage />} />
        <Route
          path="/accounts/updatecredentials/:id"
          element={<UpdateCredentialsPage />}
        />
        <Route path="/dashboard/:id" element={<DashboardHomepage />} />
        <Route path="/account/user/:id" element={<UserProfilePage />} />
        <Route
          path="/account/circlemember/:id"
          element={<FamilyCirclePages />}
        />
        <Route path="/account/settings/:id" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
