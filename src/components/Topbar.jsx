import { useState, useRef, useEffect } from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";

export default function Topbar() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState("");

  const notifRef = useRef(null);
  const settingsRef = useRef(null);

  const toggleNotif = () => {
    setNotifOpen(!notifOpen);
    setSettingsOpen(false); // Close settings if notifications open
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
    setNotifOpen(false); // Close notifications if settings open
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target) &&
        settingsRef.current &&
        !settingsRef.current.contains(event.target)
      ) {
        setNotifOpen(false);
        setSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="topbar">
      {/* Left side: profile picture and greeting */}
      <div className="topbar-left">
        <img src="/naima.png" alt="Profile" />
        <div className="topbar-text">
          <span className="hi">Hi</span>
          <span className="name">Naïma!</span>
        </div>
      </div>

      {/* Right side: icons */}
      <div className="topbar-icons">
        {/* Notifications dropdown */}
        <div className="icon-wrapper" ref={notifRef}>
          <img
            src="/notif-icon.png"
            alt="Notifications"
            className={notifOpen ? "active" : ""}
            onClick={toggleNotif}
          />
          <span className="dot"></span>
          {notifOpen && (
            <div className="dropdown-menu">
              <h4>Notifications</h4>
              <hr />
              <p className="dropdown-text">No new notifications..</p>
            </div>
          )}
        </div>

        {/* Settings dropdown */}
        <div className="icon-wrapper" ref={settingsRef}>
          <img
            src="/settings-icon.png"
            alt="Settings"
            className={settingsOpen ? "active" : ""}
            onClick={toggleSettings}
          />
          {settingsOpen && (
            <div className="dropdown-menu">
              <h4>Settings</h4>
              <hr />
              <Link
                to="/profile"
                className={
                  "dropdown-link" +
                  (selectedSetting === "Profile" ? " selected" : "")
                }
                onClick={() => setSelectedSetting("Profile")}
              >
                Profile
              </Link>
              <hr />
              <Link
                to="/preferences"
                className={
                  "dropdown-link" +
                  (selectedSetting === "Preferences" ? " selected" : "")
                }
                onClick={() => setSelectedSetting("Preferences")}
              >
                Preferences
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
