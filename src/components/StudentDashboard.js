import React from 'react';
import './styles/StudentDashboard.css';

const StudentDashboard = ({ student, onLogout }) => {
  return (
    <div className="student-dashboard-container">
      <div className="student-dashboard">
        <h2>Welcome, {student.name}</h2>
        <div className="student-info">
          <p><strong>Father's Name:</strong> {student.fatherName}</p>
          <p><strong>Mother's Name:</strong> {student.motherName}</p>
          <p><strong>Phone Number:</strong> {student.phoneNumber}</p>
          <p><strong>Email ID:</strong> {student.email}</p>
          <p><strong>Fees Paid:</strong> ₹{student.feesPaid}</p>
          <p><strong>Fees Due:</strong> ₹{student.feesDue}</p>
        </div>
        <button onClick={onLogout} className="logout-button">Pay</button>
      </div>
    </div>
  );
};

export default StudentDashboard;
