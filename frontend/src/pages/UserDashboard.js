import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserDashboard.css";

const BACKEND_URL = "http://localhost:5000"; // Change to backend URL if hosted

function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role"); // Retrieve role from localStorage
    if (!token) {
      navigate("/login"); // Redirect if not logged in
      return;
    }

    setRole(userRole); // Set role state

    // Fetch user details
    axios
      .get(`${BACKEND_URL}/user`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => setUser(response.data))
      .catch(() => navigate("/userDashboard"));

    // Fetch complaints - Show all if admin, otherwise show user-specific complaints
    const complaintsEndpoint = userRole === "admin" ? "/all-complaints" : "/complaints";

    axios
      .get(`${BACKEND_URL}${complaintsEndpoint}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => setComplaints(response.data))
      .catch((error) => console.error("Error fetching complaints:", error));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, {user?.name || "User"}!</h1>
      <p className="dashboard-subtitle">Manage your complaints efficiently.</p>

      {role !== "admin" && (
        <button className="add-complaint-btn" onClick={() => navigate("/addcomplaint")}>
          Add Complaint
        </button>
      )}

      <div className="complaints-section">
        <h2>{role === "admin" ? "All Complaints" : "Your Complaints"}</h2>
        {complaints.length === 0 ? (
          <p>No complaints available.</p>
        ) : (
          <ul>
            {complaints.map((complaint) => (
              <li key={complaint._id}>
                <strong>{complaint.title}</strong> - {complaint.status}  
                <br />
                {role === "admin" && <span>Submitted by: {complaint.userName}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default UserDashboard;
