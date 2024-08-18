import React, { useState, useEffect } from 'react';

function CustomerDetails() {
    const [customerData, setCustomerData] = useState([]);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [editedData, setEditedData] = useState({});

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

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/customer/${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            fetchCustomerDetails();
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };
    
    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setEditedData(customer);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleEditSubmit = async () => {
        if (!editingCustomer || !editingCustomer.id) {
            console.error('Editing customer or id is missing');
            return;
        }
    
        try {
            const response = await fetch(`http://127.0.0.1:5000/customer/${editingCustomer.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedData),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            fetchCustomerDetails();
            setEditingCustomer(null);
        } catch (error) {
            console.error('Error updating customer:', error);
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
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Chakki Center</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerData.map((customer) => (
                            <tr key={customer.id}> {/* Use 'id' as the unique identifier */}
                                <td>{customer.name}</td>
                                <td>{customer.phone_no}</td>
                                <td>{customer.email_id}</td>
                                <td>{customer.chakki_center_name}</td>
                                <td>{customer.address}</td>
                                <td>
                                    <button onClick={() => handleEdit(customer)}>Edit</button>
                                    <button onClick={() => handleDelete(customer.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {editingCustomer && (
                <div>
                    <h3>Edit Customer</h3>
                    <form onSubmit={e => { e.preventDefault(); handleEditSubmit(); }}>
                        <input
                            type="text"
                            name="name"
                            value={editedData.name || ''}
                            onChange={handleEditChange}
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            name="phone_no"
                            value={editedData.phone_no || ''}
                            onChange={handleEditChange}
                            placeholder="Phone"
                        />
                        <input
                            type="email"
                            name="email_id"
                            value={editedData.email_id || ''}
                            onChange={handleEditChange}
                            placeholder="Email"
                        />
                        <input
                            type="text"
                            name="chakki_center_name"
                            value={editedData.chakki_center_name || ''}
                            onChange={handleEditChange}
                            placeholder="Chakki Center"
                        />
                        <input
                            type="text"
                            name="address"
                            value={editedData.address || ''}
                            onChange={handleEditChange}
                            placeholder="Address"
                        />
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setEditingCustomer(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default CustomerDetails;
