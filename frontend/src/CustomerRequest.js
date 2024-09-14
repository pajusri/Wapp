import React, { useState, useEffect } from 'react';
import API_BASE_URL from './apiConfig';  // Import the API base URL

function CustomerRequest() {
    const [customerData, setCustomerData] = useState([]);
    const [selectedChakkiCenter, setSelectedChakkiCenter] = useState('');
    const [eggsRequested, setEggsRequested] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [hatchingDate, setHatchingDate] = useState('');
    const [requests, setRequests] = useState([]);
    const [billingList, setBillingList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchCustomerDetails();
        fetchRequests();
        fetchBilling();  // Fetch the billing data when the component mounts
    }, []);

    const fetchCustomerDetails = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/customer-details`);  // Updated URL
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCustomerData(data);
        } catch (error) {
            console.error('Error fetching customer details:', error);
        }
    };

    const fetchRequests = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/customer/requests`);  // Updated URL
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setRequests(data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const fetchBilling = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/customer/billing`);  // Updated URL
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setBillingList(data);
        } catch (error) {
            console.error('Error fetching billing data:', error);
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
            const response = await fetch(`${API_BASE_URL}/customer/request`, {  // Updated URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRequest),
            });

            if (!response.ok) {
                throw new Error('Failed to save request');
            }

            // Update the requests list after submission
            fetchRequests();
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

    const handleDelete = async (index) => {
        const requestToDelete = requests[index];
        const { chakkiCenter } = requestToDelete;

        try {
            const response = await fetch(`${API_BASE_URL}/customer/request/delete`, {  // Updated URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chakkiCenter }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete request');
            }

            // Refresh requests list after deletion
            fetchRequests();
        } catch (error) {
            console.error('Error deleting request:', error);
        }
    };

    const sendToBilling = async (index) => {
        const requestToSend = requests[index];

        // Add the request to billingList before sending to the server
        setBillingList((prevBillingList) => [...prevBillingList, requestToSend]);

        try {
            const response = await fetch(`${API_BASE_URL}/customer/request/send-to-billing`, {  // Updated URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestToSend),
            });

            if (!response.ok) {
                throw new Error('Failed to send to billing');
            }

            // Optionally refresh the list after sending to billing
            fetchRequests();
        } catch (error) {
            console.error('Error sending to billing:', error);
        }
    };

    return (
        <div className="wbody"> {/* Changed class to className */}
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
                        <button onClick={() => sendToBilling(index)}>Send this to Billing</button>
                    </li>
                ))}
            </ul>

            <h3>Billing List:</h3>
            <ul>
                {billingList.map((billingItem, index) => (
                    <li key={index}>
                        {`Chakki Center: ${billingItem.chakkiCenter}, Eggs Requested: ${billingItem.eggsRequested}, Delivery Date: ${billingItem.deliveryDate}, Hatching Date: ${billingItem.hatchingDate}`}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CustomerRequest;
