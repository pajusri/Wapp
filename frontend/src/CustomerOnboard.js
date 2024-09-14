import React, { useState } from 'react';
import API_BASE_URL from './apiConfig';  // Import the API base URL

function CustomerOnboard() {
  const [customerName, setCustomerName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [emailId, setEmailId] = useState('');
  const [chakkiCenterName, setChakkiCenterName] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const customerData = {
      name: customerName,
      phone_no: phoneNo,
      email_id: emailId,
      chakki_center_name: chakkiCenterName,
      address: address,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/customer`, {  // Updated URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (response.ok) {
        setSuccessMessage('Customer data submitted successfully!');
        setErrorMessage('');
      } else {
        throw new Error('Failed to submit customer data');
      }
    } catch (error) {
      console.error('Error submitting customer data:', error);
      setErrorMessage('Failed to submit customer data. Please try again.');
    }
  };

  return (
    <div>
      <h2>Customer Onboard</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Customer Name:
          <input
            type="text"
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Phone No:
          <input
            type="text"
            placeholder="Enter phone number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email ID:
          <input
            type="email"
            placeholder="Enter email ID"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Chakki Center Name:
          <input
            type="text"
            placeholder="Enter chakki center name"
            value={chakkiCenterName}
            onChange={(e) => setChakkiCenterName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default CustomerOnboard;
