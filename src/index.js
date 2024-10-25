import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Sample student data
const sampleStudent = {
  name: "John Doe",
  collegeName: "Example College",
  fatherName: "Mr. Doe",
  motherName: "Mrs. Doe",
  phoneNumber: "1234567890", // Use this as the password
  email: "student@example.com", // Use this as the username
  feesPaid: 500,
  feesDue: 1000,
};

// Save the sample student to localStorage
localStorage.setItem('student', JSON.stringify(sampleStudent));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
