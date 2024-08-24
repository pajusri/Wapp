import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import ColdStorage from './ColdStorage';
import Granary from './Granary';
import AvailableCocoons from './AvailableCocoons';
import WasteCocoons from './WasteCocoons';

function Stock() {
  return (
    <div>
      <h1>Stock Management</h1>
      <nav>
        <ul>
          <li><Link to="cold-storage">Cold Storage</Link></li>
          <li><Link to="granary">Granary</Link></li>
          <li><Link to="available-cocoons">Available Cocoons</Link></li>
          <li><Link to="waste-cocoons">Waste Cocoons</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="cold-storage" element={<ColdStorage />} />
        <Route path="granary" element={<Granary />} />
        <Route path="available-cocoons" element={<AvailableCocoons />} />
        <Route path="waste-cocoons" element={<WasteCocoons />} />
      </Routes>
    </div>
  );
}

export default Stock;
