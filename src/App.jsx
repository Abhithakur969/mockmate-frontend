import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home"; // Preserved your home landing component
import Dashboard from "./pages/Dashboard";
import ProfileOnboarding from "./components/ProfileOnboarding";
import Practice from "./pages/Practice";
import Progress from "./pages/Progress";
import QuestionBank from "./pages/QuestionBank";

export default function App() {
  // Read local storage inside state initialization to completely avoid useEffect cascade warnings
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("mockmate_profile_db");
    return saved ? JSON.parse(saved) : null;
  });

  const handleSaveProfile = (profileData) => {
    const standardizedProfile = {
      name: profileData.name,
      track: profileData.goal,
    };
    localStorage.setItem(
      "mockmate_profile_db",
      JSON.stringify(standardizedProfile),
    );
    setProfile(standardizedProfile);
  };

  return (
    <Router>
      <Routes>
        {/* 1. Landing Entrance Point */}
        <Route path="/" element={<Home />} />

        {/* 2. Core Workspace Routing Platform */}
        <Route
          path="/dashboard"
          element={
            profile ? (
              <Dashboard userProfile={profile} setUserProfile={setProfile} />
            ) : (
              <div className="h-screen w-screen bg-[#FDFDFB] flex items-center justify-center p-4">
                <ProfileOnboarding onSave={handleSaveProfile} />
              </div>
            )
          }
        />

        {/* 3. Feature Channels inheriting onboarding metrics safely */}
        <Route
          path="/practice"
          element={
            profile ? (
              <Practice userProfile={profile} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
        <Route
          path="/progress"
          element={
            profile ? (
              <Progress userProfile={profile} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
        <Route
          path="/question-bank"
          element={
            profile ? (
              <QuestionBank userProfile={profile} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* 4. Safety Route Guard Rule pointing back home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
