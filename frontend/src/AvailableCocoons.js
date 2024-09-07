import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AvailableCocoonsList from './AvailableCocoonsList';

function AvailableCocoons() {
  const breeds = ['FR', 'MSC', 'FC1', 'FC2'];

  return (
    <div>
      <h2>Available Cocoons</h2>
      <ul>
        {breeds.map((breed) => (
          <li key={breed}>
            <Link to={breed}>{breed}</Link>
          </li>
        ))}
      </ul>

      <Routes>
        <Route path=":breed" element={<AvailableCocoonsList />} />
      </Routes>
    </div>
  );
}

export default AvailableCocoons;
