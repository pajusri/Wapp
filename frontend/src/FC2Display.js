import React, { useState, useEffect } from 'react';

function FC2Display() {
  const [purchaseData, setPurchaseData] = useState([]);
  const [marketFilter, setMarketFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLoadEntries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:5000/purchase/fc2');
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

  const handleDelete = async (lot_no) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/purchase/fc2/${lot_no}`, {
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
      <h2>FC2 Purchase Records</h2>
      
      {/* Filters */}
      <div>
        <label>
          Market:
          <select
            value={marketFilter}
            onChange={(e) => setMarketFilter(e.target.value)}>
            <option value="">All Markets</option>
            <option value="D1">D1</option>
          <option value="D2">D2</option>
          <option value="D3">D3</option>
          <option value="D4">D4</option>
          <option value="D5">D5</option>
          <option value="D6">D6</option>
          <option value="D7">D7</option>
          <option value="D8">D8</option>
          <option value="D9">D9</option>
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
              .filter(record => (marketFilter === '' || record.market === marketFilter) && (dateFilter === '' || record.date_of_purchase === dateFilter))
              .map((record, index) => (
                <tr key={index}>
                  <td>{record.market}</td>
                  <td>{record.lot_no}</td>
                  <td>{record.kgs_purchased}</td>
                  <td>{record.price_per_kg}</td>
                  <td>{record.farmer_name}</td>
                  <td>{record.date_of_purchase}</td>
                  <td>{record.total_cost}</td>
                  <td>
                    <button onClick={() => handleDelete(record.lot_no)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FC2Display;
