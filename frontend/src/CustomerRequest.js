import React, { useState, useEffect } from 'react';

function CustomerRequest() {
    const [customerData, setCustomerData] = useState([]);
    const [selectedChakkiCenter, setSelectedChakkiCenter] = useState('');
    const [eggsRequested, setEggsRequested] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [hatchingDate, setHatchingDate] = useState('');
    const [requests, setRequests] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (new Date(deliveryDate) >= new Date(hatchingDate)) {
            setErrorMessage('Delivery date must be earlier than hatching date.');
            return;
        }

        const newRequest = {
            chakkiCenter: selectedChakkiCenter,
            eggsRequested,
            deliveryDate,
            hatchingDate,
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/customer/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRequest),
            });

            if (!response.ok) {
                throw new Error('Failed to save request');
            }

            setRequests([...requests, newRequest]);
            resetForm();
        } catch (error) {
            console.error('Error submitting request:', error);
        }
    };

    const resetForm = () => {
        setSelectedChakkiCenter('');
        setEggsRequested('');
        setDeliveryDate('');
        setHatchingDate('');
    };

    const handleDelete = (index) => {
        const updatedRequests = requests.filter((_, i) => i !== index);
        setRequests(updatedRequests);
    };

    const markAsDelivered = async (index) => {
        const requestToMark = requests[index];
        const { chakkiCenter } = requestToMark;

        try {
            const response = await fetch('http://127.0.0.1:5000/customer/request/deliver', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chakkiCenter }),
            });

            if (!response.ok) {
                throw new Error('Failed to mark as delivered');
            }

            handleDelete(index); // Remove from current list after marking as delivered
        } catch (error) {
            console.error('Error marking as delivered:', error);
        }
    };

    return (
        <div>
            <h2>Customer Request</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Chakki Center:</label>
                    <select
                        value={selectedChakkiCenter}
                        onChange={(e) => setSelectedChakkiCenter(e.target.value)}
                        required
                    >
                        <option value="">Select Chakki Center</option>
                        {customerData.map((customer) => (
                            <option key={customer.id} value={customer.chakki_center_name}>
                                {customer.chakki_center_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Eggs Requested:</label>
                    <input
                        type="number"
                        value={eggsRequested}
                        onChange={(e) => setEggsRequested(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Delivery Date:</label>
                    <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Hatching Date:</label>
                    <input
                        type="date"
                        value={hatchingDate}
                        onChange={(e) => setHatchingDate(e.target.value)}
                        required
                    />
                </div>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                <button type="submit">Submit Request</button>
            </form>

            <h3>Requests:</h3>
            <ul>
                {requests.map((request, index) => (
                    <li key={index}>
                        {`Chakki Center: ${request.chakkiCenter}, Eggs Requested: ${request.eggsRequested}, Delivery Date: ${request.deliveryDate}, Hatching Date: ${request.hatchingDate}`}
                        <button onClick={() => handleDelete(index)}>Delete</button>
                        <button onClick={() => markAsDelivered(index)}>Send the entry to billing</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CustomerRequest;
