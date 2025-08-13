import { Routes, Route } from "react-router-dom";
import SplashScreen from "./SplashScreen";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import Studies from "./pages/Studies";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import Preferences from "./pages/Preferences";
import { useState, useEffect } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/studies" element={<Studies />} />
      <Route path="/help" element={<Help />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/preferences" element={<Preferences />} />
    </Routes>
  );
}
