import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Customer from './Customer';  // Ensure this path is correct
import Stock from './Stock';        // Ensure this path is correct
import Employee from './Employee';  // Ensure this path is correct
import Bill from './Bill';          // Ensure this path is correct
import ProductionBook from './ProductionBook';  
import Purchase from './Purchase';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Login failed');
      }

      navigate('/welcome');
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
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

function Welcome() {
  return (
    <div>
      <h1>Welcome to the application!</h1>
      <ul>
        <li><a href="/customer">Customer-related</a></li>
        <li><a href="/production-book">production-book</a></li>
        <li><a href="/purchase">Purchase</a></li>
        <li><a href="/stock">Stock</a></li>
        <li><a href="/employee">Employee</a></li>
        <li><a href="/bill">Bill</a></li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/customer/*" element={<Customer />} />
        <Route path="/production-book" element={<ProductionBook />} /> 
        <Route path="/purchase/*" element={<Purchase />} /> {/* Handle routing within Purchase */}
        <Route path="/stock" element={<Stock />} />
        <Route path="/employee/*" element={<Employee />} />
        <Route path="/bill" element={<Bill />} />
      </Routes>
    </Router>
  );
}

export default App;
