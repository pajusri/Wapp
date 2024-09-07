import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

function AvailableCocoonsList() {
  const { breed } = useParams();
  const [cocoonsData, setCocoonsData] = useState([]);

  const fetchCocoonsData = useCallback(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/acocoons/${breed}`);
      if (response.ok) {
        const data = await response.json();
        setCocoonsData(data);
      } else {
        console.error('Failed to fetch cocoons data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching cocoons data:', error);
    }
  }, [breed]);

  useEffect(() => {
    fetchCocoonsData();
  }, [fetchCocoonsData]);

  return (
    <div>
      <h3>{breed} Cocoons Data</h3>
      {cocoonsData.length === 0 ? (
        <p>No data available for {breed}.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Breed</th>
              <th>Market</th>
              <th>Lot Number</th>
              <th>Farmer Name</th>
              <th>KG Purchased</th>
              <th>Date Purchased</th>
            </tr>
          </thead>
          <tbody>
            {cocoonsData.map((record, index) => (
              <tr key={index}>
                <td>{breed}</td>
                <td>{record.market}</td>
                <td>{record.lot_no}</td>
                <td>{record.farmer_name}</td>
                <td>{record.kgs_purchased}</td>
                <td>{record.date_of_purchase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AvailableCocoonsList;
