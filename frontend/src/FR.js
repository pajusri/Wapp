import React, { useState } from 'react';
import API_BASE_URL from './apiConfig'; // Import the API base URL

function FR() {
  const [formData, setFormData] = useState({
    market: 'A1',
    lotNo: '',
    kgsPurchased: '',
    pricePerKg: '',
    farmerName: '',
    purchaseDate: '',
  });

  const [purchases, setPurchases] = useState([]);
  const [filter, setFilter] = useState({ market: '', date: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalPrice = formData.kgsPurchased * formData.pricePerKg;
    const purchaseData = { ...formData, totalPrice };

    try {
      const response = await fetch(`${API_BASE_URL}/purchase/fr`, { // Updated URL with API_BASE_URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(purchaseData),
      });

      if (response.ok) {
        setPurchases([...purchases, purchaseData]);
      }
    } catch (error) {
      console.error('Error submitting purchase data:', error);
    }
  };

  const filteredPurchases = purchases.filter((purchase) => {
    const matchMarket = filter.market ? purchase.market === filter.market : true;
    const matchDate = filter.date ? purchase.purchaseDate === filter.date : true;
    return matchMarket && matchDate;
  });

  return (
    <div>
      <h3>FR Purchases</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Market:
          <select name="market" value={formData.market} onChange={handleChange}>
            {['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'].map((market) => (
              <option key={market} value={market}>
                {market}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Lot No:
          <input type="text" name="lotNo" value={formData.lotNo} onChange={handleChange} />
        </label>
        <br />
        <label>
          Kgs Purchased:
          <input type="number" name="kgsPurchased" value={formData.kgsPurchased} onChange={handleChange} />
        </label>
        <br />
        <label>
          Price Per Kg:
          <input type="number" name="pricePerKg" value={formData.pricePerKg} onChange={handleChange} />
        </label>
        <br />
        <label>
          Farmer Name:
          <input type="text" name="farmerName" value={formData.farmerName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Date of Purchase:
          <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      <h4>Filter Purchases</h4>
      <label>
        Market:
        <select name="market" value={filter.market} onChange={(e) => setFilter({ ...filter, market: e.target.value })}>
          <option value="">All</option>
          {['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'].map((market) => (
            <option key={market} value={market}>
              {market}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Date:
        <input type="date" value={filter.date} onChange={(e) => setFilter({ ...filter, date: e.target.value })} />
      </label>
      <br />

      <h4>Purchase Records</h4>
      <ul>
        {filteredPurchases.map((purchase, index) => (
          <li key={index}>
            {`${purchase.market} - Lot ${purchase.lotNo}: ${purchase.kgsPurchased} kg at ₹${purchase.pricePerKg}/kg = ₹${purchase.totalPrice}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FR;
