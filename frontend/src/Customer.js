import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import CustomerOnboard from './CustomerOnboard'; // Import from the new file
import CustomerDetails from './CustomerDetails'; // Import the class component
import CustomerRequest from './CustomerRequest'; // Ensure this file exists

function Customer() {
    return (
        <div>
            <h1>Customer Management</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="onboard">Customer Onboard</Link>
                    </li>
                    <li>
                        <Link to="details">Customer Details</Link>
                    </li>
                    <li>
                        <Link to="request">Customer Request</Link>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="onboard" element={<CustomerOnboard />} />
                <Route path="details" element={<CustomerDetails />} />
                <Route path="request" element={<CustomerRequest />} />
            </Routes>
        </div>
    );
}

export default Customer;
