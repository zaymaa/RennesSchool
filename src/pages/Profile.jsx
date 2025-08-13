import React from "react";
import Layout from "../components/Layout";
import "./Profile.css";

function Profile() {
  return (
    <Layout>
      <div className="profile-page">
        <div className="profile-card">
          {/* Profile info section */}
          <h2 className="section-title">
            <img src="/user.png" alt="User Icon" className="icon-title" />
            Profile
          </h2>
          <p className="section-desc">
            This section lets you update your personal details.
          </p>

          <div className="form-group">
            <label>New Name:</label>
            <input type="text" placeholder="Your New Name" />
          </div>

          <hr className="divider" />

          {/* Password change section */}
          <h3 className="section-title">
            <img src="/key.png" alt="Key Icon" className="icon-title" />
            Change Password
          </h3>

          <div className="form-group">
            <label>Current Password:</label>
            <input type="password" placeholder="Enter current password" />
          </div>

          <div className="form-group">
            <label>New Password:</label>
            <input type="password" placeholder="Enter new password" />
          </div>

          <div className="form-group">
            <label>Confirm New Password:</label>
            <input type="password" placeholder="Confirm new password" />
          </div>

          <button className="save-btn">Save Changes</button>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
