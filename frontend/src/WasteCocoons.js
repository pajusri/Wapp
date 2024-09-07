import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import WasteCocoonsEntry from './WasteCocoonsEntry';
import WasteCocoonsExit from './WasteCocoonsExit';
import WasteCocoonsAvailable from './WasteCocoonsAvailable';  // Import the new component

function WasteCocoons() {
  return (
    <div>
      <h2>Waste Cocoons</h2>
      <nav>
        <ul>
          <li><Link to="entry">Entry</Link></li>
          <li><Link to="exit">Exit</Link></li>
          <li><Link to="available">Available</Link></li> {/* Link to Available Page */}
        </ul>
      </nav>

      <Routes>
        <Route path="entry" element={<WasteCocoonsEntry />} />
        <Route path="exit" element={<WasteCocoonsExit />} />
        <Route path="available" element={<WasteCocoonsAvailable />} /> {/* Add Available Page Route */}
      </Routes>
    </div>
  );
}

export default WasteCocoons;
