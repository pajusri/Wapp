import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CustomerDetails() {
    const [customerData, setCustomerData] = useState([]);

    useEffect(() => {
        fetchCustomerDetails();
    }, []);

    const fetchCustomerDetails = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/customer-details');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCustomerData(data);
        } catch (error) {
            console.error('Error fetching customer details:', error);
        }
    };

    return (
        <div>
            <h2>Customer Details</h2>
            {customerData.length === 0 ? (
                <p>No customer data available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>                                 .    </th>
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
                                <th>                               .      </th>
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
