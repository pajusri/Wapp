import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import ColdStorageEntry from './ColdStorageEntry';
import ColdStorageDisplay from './ColdStorageDisplay';

function ColdStorage() {
  return (
    <div>
      <h2>Cold Storage</h2>
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

export default ColdStorage;

