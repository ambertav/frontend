import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/Landing/Landing";
import SignUpPage from "./pages/SignUp/SignUp";
import LoginPage from "./pages/Login/Login";
import ProfilePage from "./pages/Profile/Profile";
import FriendsPage from "./pages/FriendsPage/FriendsPage";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/friends" element={<FriendsPage />} />
      </Routes>
    </div>
  );
}

export default App;
