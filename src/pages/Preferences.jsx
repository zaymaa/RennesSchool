import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "./Preferences.css";

export default function Preferences() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "Light";
  });

  const themes = [
    { name: "Light", icon: "/brightness.png" },
    { name: "Dark", icon: "/moon.png" }
  ];

  // Tema değiştiğinde hem body class'ı hem localStorage güncellenir
  useEffect(() => {
    if (theme === "Dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Layout>
      <div className="preferences-page">
        <div className="preferences-card">
          <h2 className="section-title">
            <img src="/options.png" alt="Settings Icon" className="icon-title" />
            Preferences
          </h2>
          <p className="preferences-desc">
            Here you can customize your dashboard preferences.
          </p>

          <label>Theme:</label>
          <div className="custom-dropdown">
            <div className="selected-option">
              <img src={themes.find(t => t.name === theme).icon} alt="" />
              <span>{theme}</span>
            </div>
            <div className="dropdown-options">
              {themes.map((t) => (
                <div
                  key={t.name}
                  className="dropdown-option"
                  onClick={() => setTheme(t.name)}
                >
                  <img src={t.icon} alt="" />
                  <span>{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
