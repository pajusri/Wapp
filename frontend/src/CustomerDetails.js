import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from './apiConfig';  // Import the API base URL

function CustomerDetails() {
    const [customerData, setCustomerData] = useState([]);

    // This effect will run when the component is mounted, ensuring the fetch is triggered
    useEffect(() => {
        fetchCustomerDetails();  // Call the function to fetch customer data
    }, []);

    // Function to fetch customer details
    const fetchCustomerDetails = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/customer-details?timestamp=${new Date().getTime()}`, {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('Fetched customer data:', data);  // Log fetched data
    
            if (data.length === 0) {
                console.log('No customer data returned from the server');  // Log when no data is returned
            } else {
                console.log('Customer data received:', data);  // Log when customer data is returned
            }
    
            setCustomerData(data);  // Update the state with fetched customer data
        } catch (error) {
            console.error('Error fetching customer details:', error);  // Log any errors
        }
    };
    
    

    

    return (
        <div className="mbody">  {/* Use className for JSX */}
            <h2>Customer Details</h2>
            {customerData.length === 0 ? (
                <p>No customer data available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Chakki Center</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerData.map((customer) => (
                            <tr key={customer.id}>
                                <td>
                                    <Link to={`/customer/details/${customer.id}`}>
                                        {customer.name}
                                    </Link>
                                </td>
                                <td>{customer.chakki_center_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default CustomerDetails;
