import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddComplaint.css";

function AddComplaint() {
  const [complaint, setComplaint] = useState({ title: "", description: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setComplaint({ ...complaint, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/complaints",
        complaint,
        {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        }
      );

      console.log("Complaint submitted successfully:", response.data);
      setMessage("Complaint submitted successfully!");
      setTimeout(() => navigate("/userDashboard"), 2000);
    } catch (error) {
      console.error("Error submitting complaint:", error.response?.data || error.message);
      setMessage("Error submitting complaint. Please try again.");
    }
  };

  return (
    <div className="add-complaint-container">
      <h2>Add a New Complaint</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Title</label>
          <input type="text" name="title" value={complaint.title} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Description</label>
          <textarea name="description" value={complaint.description} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      <button className="back-btn" onClick={() => navigate("/userDashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default AddComplaint;

