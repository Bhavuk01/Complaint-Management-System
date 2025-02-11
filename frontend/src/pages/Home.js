import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="content">
        <h1 className="home-title">Effortless Complaint Management</h1>
        <p className="home-description">
          A seamless platform to submit, track, and resolve complaints with ease. Ensure transparency and efficiency at your fingertips.
        </p>

        <div className="home-buttons">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/register" className="signup-btn">Sign Up</Link>
        </div>

        <div className="features-container">
          <div className="feature-box">
            <h3 className="feature-title">📝 Easy Submission</h3>
            <p>Register complaints effortlessly and get quick responses.</p>
          </div>
          <div className="feature-box">
            <h3 className="feature-title">📊 Real-time Tracking</h3>
            <p>Monitor complaint progress with real-time updates.</p>
          </div>
          <div className="feature-box">
            <h3 className="feature-title">🔒 Secure & Reliable</h3>
            <p>Your data is protected, ensuring confidentiality and trust.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
