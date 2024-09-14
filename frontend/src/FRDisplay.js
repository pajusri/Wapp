import React, { useState, useEffect } from 'react';
import API_BASE_URL from './apiConfig'; // Import the centralized API base URL

function FRDisplay() {
  const [purchaseData, setPurchaseData] = useState([]);
  const [marketFilter, setMarketFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLoadEntries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/purchase/fr`); // Use API_BASE_URL
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setPurchaseData(data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?') && window.confirm('Are you really sure?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/purchase/fr/${id}`, { // Use API_BASE_URL
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        alert('Entry deleted successfully');
        handleLoadEntries(); // Refresh the data
      } catch (err) {
        console.error('Error deleting data:', err);
        alert('Failed to delete entry');
      }
    }
  };

  useEffect(() => {
    handleLoadEntries();
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error loading data: {error}</p>;

  return (
    <div>
      <h2>FR Purchase Records</h2>
      
      <div>
        <label>
          Market:
          <select
            value={marketFilter}
            onChange={(e) => setMarketFilter(e.target.value)}
          >
            <option value="">All Markets</option>
            <option value="Tumkur">Tumkur</option>
            <option value="Hassan">Hassan</option>
            <option value="Athibele">Athibele</option>
            <option value="Sarjapura">Sarjapura</option>
            <option value="K.R Pete">K.R Pete</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Block">Block</option>
          </select>
        </label>
        <label>
          Date:
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </label>
      </div>
      
      <button onClick={handleLoadEntries}>Refresh Entries</button>
      {purchaseData.length === 0 ? (
        <p>No purchase records found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Market</th>
              <th>Lot No</th>
              <th>Kgs Purchased</th>
              <th>Price per Kg</th>
              <th>Farmer Name</th>
              <th>Date of Purchase</th>
              <th>Total Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchaseData
              .filter(record => 
                (marketFilter === '' || record.market === marketFilter) &&
                (dateFilter === '' || record.date_of_purchase === dateFilter)
              )
              .map(record => (
                <tr key={record.id}>
                  <td>{record.market}</td>
                  <td>{record.lot_no}</td>
                  <td>{record.kgs_purchased}</td>
                  <td>{record.price_per_kg}</td>
                  <td>{record.farmer_name}</td>
                  <td>{record.date_of_purchase}</td>
                  <td>{record.total_cost}</td>
                  <td><button onClick={() => handleDelete(record.id)}>Delete</button></td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FRDisplay;
