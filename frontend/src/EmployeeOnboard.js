import React, { useState } from 'react';
import API_BASE_URL from './apiConfig';  // Import the API base URL

function EmployeeOnboard() {
  const [employeeName, setEmployeeName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [emailId, setEmailId] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const employeeData = {
      name: employeeName,
      phone_no: phoneNo,
      email_id: emailId,
      designation: designation,
      department: department,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/employee`, {  // Updated URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      if (response.ok) {
        setSuccessMessage('Employee data submitted successfully!');
        setErrorMessage('');
      } else {
        throw new Error('Failed to submit employee data');
      }
    } catch (error) {
      console.error('Error submitting employee data:', error);
      setErrorMessage('Failed to submit employee data. Please try again.');
    }
  };

  return (
    <div>
      <h2>Employee Onboard</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Employee Name:
          <input
            type="text"
            placeholder="Enter employee name"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
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
          Designation:
          <input
            type="text"
            placeholder="Enter designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Department:
          <input
            type="text"
            placeholder="Enter department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
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

export default EmployeeOnboard;
