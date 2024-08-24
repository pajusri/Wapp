import React, { useState } from 'react';

function FC2Input() {
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
      const response = await fetch('http://127.0.0.1:5000/purchase/fc2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, total_cost }), // Include total_cost in the payload
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

export default FC2Input;
