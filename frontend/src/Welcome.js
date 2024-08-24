import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div>
      <h1>Welcome to the application!</h1>
      <ul>
        <li><Link to="/customer">Customer-related</Link></li>
        <li><Link to="/production-book">Production Book</Link></li> 
        <li><a href="/purchase">Purchase</a></li>
        <li><Link to="/stock">Stock</Link></li>
        <li><Link to="/employee">Employee</Link></li>
        <li><Link to="/bill">Bill</Link></li>
      </ul>
    </div>
  );
}

export default Welcome;
