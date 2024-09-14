import React, { useState, useEffect } from 'react';
import API_BASE_URL from './apiConfig'; // Import the centralized API base URL

function MSCDisplay() {
  const [purchaseData, setPurchaseData] = useState([]);
  const [marketFilter, setMarketFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLoadEntries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/purchase/msc`); // Use API_BASE_URL
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
        const response = await fetch(`${API_BASE_URL}/purchase/msc/${id}`, { method: 'DELETE' }); // Use API_BASE_URL
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
      <h2>MSC Purchase Records</h2>

      {/* Filters */}
      <div>
        <label>
          Market:
          <select
            value={marketFilter}
            onChange={(e) => setMarketFilter(e.target.value)}
          >
            <option value="">All Markets</option>
            <option value="Chaudunkupe">Chaudunkupe</option>
            <option value="Huliur Durga">Huliur Durga</option>
            <option value="Magdi">Magdi</option>
            <option value="Kunigal">Kunigal</option>
            <option value="VG Dodi">VG Dodi</option>
            <option value="Kempanahalli">Kempanahalli</option>
            <option value="Hebur">Hebur</option>
            <option value="Solur">Solur</option>
            <option value="Kudur">Kudur</option>
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
        <button onClick={handleLoadEntries}>Refresh Entries</button>
      </div>

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

export default MSCDisplay;
