import React, { useState } from 'react';
import API_BASE_URL from './apiConfig'; // Import the centralized API base URL

function FRInput() {
  const [formData, setFormData] = useState({
    market: '',
    lot_no: '',
    kgs_purchased: '',
    price_per_kg: '',
    farmer_name: '',
    date_of_purchase: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const total_cost = formData.kgs_purchased * formData.price_per_kg; // Calculate total cost

    try {
      const response = await fetch(`${API_BASE_URL}/purchase/fr`, { // Use API_BASE_URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, total_cost }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit purchase data');
      }

      alert('Data submitted successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit data');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Market:
        <select
          name="market"
          value={formData.market}
          onChange={handleChange}
          required
        >
          <option value="">Select Market</option>
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
        Lot No:
        <input
          type="text"
          name="lot_no"
          value={formData.lot_no}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Kgs Purchased:
        <input
          type="number"
          name="kgs_purchased"
          value={formData.kgs_purchased}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Price per Kg:
        <input
          type="number"
          name="price_per_kg"
          value={formData.price_per_kg}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Farmer Name and Village:
        <input
          type="text"
          name="farmer_name"
          value={formData.farmer_name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Date of Purchase:
        <input
          type="date"
          name="date_of_purchase"
          value={formData.date_of_purchase}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default FRInput;
