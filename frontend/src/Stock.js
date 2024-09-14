import React from 'react';
import { Link, Routes, Route,useNavigate } from 'react-router-dom';
import ColdStorageEntry from './ColdStorageEntry'; // Import Cold Storage Entry Component
import ColdStorageDisplay from './ColdStorageDisplay'; 
import AvailableCocoons from './AvailableCocoons'; // Import Available Cocoons Component
import Granage from './Granage'; // Import Granage Component
import WasteCocoons from './WasteCocoons'; // Import Waste Cocoons Component

function Stock() {
  const navigate = useNavigate();

  return (
    <div class="wbody">
      <h1>Stock Management</h1>
      <nav>
        <ul>
          <li><Link to="cold-storage">Cold Storage</Link></li>
          <li><Link to="granage">Granage</Link></li>
          <li><Link to="available-cocoons">Available Cocoons</Link></li>
          <li><Link to="waste-cocoons">Waste Cocoons</Link></li>
          <button onClick={() => navigate('/welcome')}>Back to Main page</button>
        </ul>
      </nav>

      <Routes>
        <Route path="cold-storage/*" element={<ColdStorage />} />
        <Route path="granage" element={<Granage />} />
        <Route path="available-cocoons/*" element={<AvailableCocoons />} />
        <Route path="waste-cocoons/*" element={<WasteCocoons />} /> {/* Correct nested route */}
       

      </Routes>
    </div>
  );
}

function ColdStorage() {
  return (
    <div>
      <h2>Cold Storage Management</h2>
      <nav>
        <ul>
          <li><Link to="entry">Entry</Link></li>
          <li><Link to="display">Display</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="entry" element={<ColdStorageEntry />} />
        <Route path="display" element={<ColdStorageDisplay />} />
      </Routes>
    </div>
  );
}

export default Stock;
