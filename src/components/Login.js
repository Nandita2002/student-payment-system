import React, { useState } from 'react';
import './styles/Login.css';
import backgroundImage from '../assets/28468.jpg'; // Ensure this path is correct
// Adjust the path as necessary

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role set to student
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Admin login check
    if (role === 'admin') {
      const adminEmail = 'admin@example.com';
      const adminPassword = 'admin123';

      if (email === adminEmail && password === adminPassword) {
        onLogin({ name: 'Admin User' }, 'admin');
      } else {
        setError('Invalid admin credentials.');
      }
    } else if (role === 'student') {
      // Load students from localStorage and match credentials
      const students = JSON.parse(localStorage.getItem('students')) || [];
      const student = students.find(
        (stu) => stu.email === email && stu.phoneNumber === password
      );

      if (student) {
        onLogin(student, 'student');
      } else {
        setError('Invalid student credentials. Please check your email and phone number.');
      }
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="role-selector">
          <label>
            <input
              type="radio"
              value="student"
              checked={role === 'student'}
              onChange={() => setRole('student')}
            />
            Student
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
            />
            Admin
          </label>
        </div>
        <input
          type="email"
          placeholder={role === 'admin' ? "Admin Email" : "Student Email"}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(''); // Clear error when user types
          }}
          required
        />
        <input
          type="password"
          placeholder={role === 'admin' ? "Admin Password" : "Phone Number as Password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(''); // Clear error when user types
          }}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
