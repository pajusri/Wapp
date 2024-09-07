import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Link, Navigate } from 'react-router-dom';
import Customer from './Customer';
import Stock from './Stock';
import Employee from './Employee';
import Bill from './Bill';
import ProductionBook from './ProductionBook';
import Purchase from './Purchase';

// Login Component
function Login({ setRole }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is already logged in, redirect to welcome
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      navigate('/welcome');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }

      // Store role and authentication status
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('role', result.role);

      setRole(result.role);  // Store role in state
      navigate('/welcome');  // Navigate to welcome page
    } catch (error) {
      console.error('Error:', error);
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
}

// Welcome Component
function Welcome({ role, onLogout }) {
  return (
    <div>
      <h1>Welcome to the application!</h1>
      <ul>
        {/* Owner: Show all pages */}
        {role === 'owner' && (
          <>
            <li><Link to="/customer">Customer-related</Link></li>
            <li><Link to="/production-book">Production Book</Link></li>
            <li><Link to="/purchase">Purchase</Link></li>
            <li><Link to="/stock">Stock</Link></li>
            <li><Link to="/employee">Employee</Link></li>
            <li><Link to="/bill">Bill</Link></li>
          </>
        )}
        {/* Manager: Show specific pages */}
        {role === 'manager' && (
          <>
            <li><Link to="/production-book">Production Book</Link></li>
            <li><Link to="/stock">Stock</Link></li>
            <li><Link to="/employee">Employee</Link></li>
          </>
        )}
        {/* Accountant: Show specific pages */}
        {role === 'accountant' && (
          <>
            <li><Link to="/customer">Customer-related</Link></li>
            <li><Link to="/purchase">Purchase</Link></li>
            <li><Link to="/bill">Bill</Link></li>
          </>
        )}
      </ul>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

// ProtectedRoute Component
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// Main App Component
function App() {
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  const handleLogout = () => {
    // Clear localStorage and redirect to login
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');
    setRole('');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login setRole={setRole} />}
        />
        <Route
          path="/welcome"
          element={
            <ProtectedRoute>
              <Welcome role={role} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/*"
          element={
            <ProtectedRoute>
              <Customer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/production-book/*"
          element={
            <ProtectedRoute>
              <ProductionBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/purchase/*"
          element={
            <ProtectedRoute>
              <Purchase />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stock/*"
          element={
            <ProtectedRoute>
              <Stock />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/*"
          element={
            <ProtectedRoute>
              <Employee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bill/*"
          element={
            <ProtectedRoute>
              <Bill />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
