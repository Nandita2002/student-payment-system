import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';

const App = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');

  useEffect(() => {
    // Initialize default admin and student data if not already set
    const defaultAdmin = {
      email: 'admin@example.com',
      password: 'admin123',
    };
    const defaultStudent = {
      name: 'John Doe',
      fatherName: 'Michael Doe',
      motherName: 'Sarah Doe',
      phoneNumber: '1234567890',
      email: 'student@example.com',
      password: 'student123',
      feesPaid: '5000',
      feesDue: '2000',
    };

    // Set admin credentials
    if (!localStorage.getItem('admin')) {
      localStorage.setItem('admin', JSON.stringify(defaultAdmin));
    }

    // Set student credentials
    if (!localStorage.getItem('students')) {
      localStorage.setItem('students', JSON.stringify([defaultStudent]));
    }
  }, []);

  const handleLogin = (loggedInUser, userRole) => {
    setUser(loggedInUser);
    setRole(userRole);
  };

  const handleLogout = () => {
    setUser(null);
    setRole('');
  };

  return (
    <div className="app">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : role === 'admin' ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <StudentDashboard student={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
