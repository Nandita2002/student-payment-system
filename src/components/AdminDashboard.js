import React, { useState, useEffect } from 'react';
import './styles/AdminDashboard.css';

const AdminDashboard = ({ onLogout }) => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    phoneNumber: '',
    email: '',
    HallTicketNumber: '',
    feesPaid: '',
    feesDue: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Load students from localStorage
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(storedStudents);
  }, []);

  // Save students to localStorage
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedStudents = students.map((student, index) =>
        index === editingIndex ? newStudent : student
      );
      setStudents(updatedStudents);
      setIsEditing(false);
      setEditingIndex(null);
    } else {
      setStudents([...students, newStudent]);
    }
    // Reset the new student state
    setNewStudent({
      name: '',
      fatherName: '',
      motherName: '',
      phoneNumber: '',
      email: '',
      HallTicketNumber: '',
      feesPaid: '',
      feesDue: '',
    });
  };

  const handleEditStudent = (index) => {
    setIsEditing(true);
    setEditingIndex(index);
    setNewStudent(students[index]);
  };

  const handleDeleteStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };

  return (
    <div className="admin-dashboard-container">
      <div className="sidebar">
        <h3>Admin Dashboard</h3>
        <button onClick={() => setIsEditing(false)}>Add Student</button>
        <button onClick={() => setIsEditing(true)}>View Students</button>
        <button onClick={onLogout}>Logout</button>
      </div>
      <div className="main-content">
        {isEditing ? (
          <div className="student-list">
            <h2>Student Details</h2>
            {students.length > 0 ? (
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Father's Name</th>
                    <th>Mother's Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Hall Ticket Number</th>
                    <th>Fees Paid</th>
                    <th>Fees Due</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index}>
                      <td>{student.name}</td>
                      <td>{student.fatherName}</td>
                      <td>{student.motherName}</td>
                      <td>{student.phoneNumber}</td>
                      <td>{student.email}</td>
                      <td>{student.HallTicketNumber}</td>
                      <td>₹{student.feesPaid}</td>
                      <td>₹{student.feesDue}</td>
                      <td>
                        <button onClick={() => handleEditStudent(index)}>Edit</button>
                        <button onClick={() => handleDeleteStudent(index)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No students found.</p>
            )}
          </div>
        ) : (
          <div className="student-form">
            <h2>{isEditing ? 'Edit Student' : 'Add Student'}</h2>
            <form onSubmit={handleAddStudent}>
              <input
                type="text"
                name="name"
                placeholder="Student Name"
                value={newStudent.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="fatherName"
                placeholder="Father's Name"
                value={newStudent.fatherName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="motherName"
                placeholder="Mother's Name"
                value={newStudent.motherName}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={newStudent.phoneNumber}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newStudent.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="HallTicketNumber"
                placeholder="Hall Ticket Number"
                value={newStudent.HallTicketNumber}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="feesPaid"
                placeholder="Fees Paid"
                value={newStudent.feesPaid}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="feesDue"
                placeholder="Fees Due"
                value={newStudent.feesDue}
                onChange={handleInputChange}
                required
              />
              <button type="submit">{isEditing ? 'Update' : 'Add'} Student</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
