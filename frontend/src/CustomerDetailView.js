import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CustomerDetailView() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const fetchCustomerDetails = useCallback(async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/customer/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCustomer(data);
            setEditedData(data); // Initialize the edited data with the current customer data
        } catch (error) {
            console.error('Error fetching customer details:', error);
        }
    }, [id]);

    useEffect(() => {
        fetchCustomerDetails();
    }, [fetchCustomerDetails]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditSubmit = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/customer/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedData),
            });

            if (!response.ok) {
                throw new Error('Failed to update customer');
            }

            setCustomer(editedData);  // Update the customer state with the edited data
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                const response = await fetch(`http://127.0.0.1:5000/customer/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete customer');
                }
                alert('Customer deleted successfully');
                navigate('/customer'); // Navigate back to the customer list
            } catch (error) {
                console.error('Error deleting customer:', error);
                alert('Failed to delete customer');
            }
        }
    };

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div>
            <button onClick={handleBack}>Back</button>
            {customer ? (
                <>
                    <h1>Details of customer</h1>
                    <h2>{customer.name}</h2>
                    {isEditing ? (
                        <div>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={editedData.name || ''}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Phone:
                                <input
                                    type="text"
                                    name="phone_no"
                                    value={editedData.phone_no || ''}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email_id"
                                    value={editedData.email_id || ''}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Chakki Center:
                                <input
                                    type="text"
                                    name="chakki_center_name"
                                    value={editedData.chakki_center_name || ''}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Address:
                                <input
                                    type="text"
                                    name="address"
                                    value={editedData.address || ''}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <button onClick={handleEditSubmit}>Save</button>
                            <button onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <p><strong>Phone:</strong> {customer.phone_no}</p>
                            <p><strong>Email:</strong> {customer.email_id}</p>
                            <p><strong>Chakki Center:</strong> {customer.chakki_center_name}</p>
                            <p><strong>Address:</strong> {customer.address}</p>
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                    )}
                </>
            ) : (
                <p>Loading customer details...</p>
            )}
        </div>
    );
}

export default CustomerDetailView;
