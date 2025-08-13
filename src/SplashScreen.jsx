import React from "react";
import "./SplashScreen.css";

export default function SplashScreen() {
  return (
    <div className="splash-container">
      <img src="/logo.png" alt="Rennes School Logo" className="splash-logo" />
      <div className="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
