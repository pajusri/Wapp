import React, { useState, useEffect } from 'react';
import API_BASE_URL from './apiConfig'; // Import the centralized API base URL

function WasteCocoonsAvailable() {
  const [availableKgs, setAvailableKgs] = useState({});

  useEffect(() => {
    const fetchAvailableKgs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/waste_cocoons/available`);
        const data = await response.json();
        setAvailableKgs(data);  // Set the entire object containing breed data
      } catch (error) {
        console.error('Error fetching available kgs:', error);
      }
    };

    fetchAvailableKgs();
  }, []);

  return (
    <div>
      <h2>Available Waste Cocoons</h2>
      {Object.keys(availableKgs).length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {Object.entries(availableKgs).map(([breed, kgs]) => (
            <li key={breed}>
              Breed: {breed}, Available Kgs: {kgs}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WasteCocoonsAvailable;
