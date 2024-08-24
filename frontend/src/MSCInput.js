import React, { useState } from 'react';

function MSCInput() {
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
    const total_cost = formData.kgs_purchased * formData.price_per_kg;

    try {
      const response = await fetch('http://127.0.0.1:5000/purchase/msc', {
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
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="B3">B3</option>
          <option value="B4">B4</option>
          <option value="B5">B5</option>
          <option value="B6">B6</option>
          <option value="B7">B7</option>
          <option value="B8">B8</option>
          <option value="B9">B9</option>
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

export default MSCInput;
