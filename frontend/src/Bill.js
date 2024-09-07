import React, { useState, useEffect } from 'react';

function Bill() {
    const [billingEntries, setBillingEntries] = useState([]);

    useEffect(() => {
        fetchBillingEntries();
    }, []);

    const fetchBillingEntries = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/customer/billing-entries');
            if (!response.ok) {
                throw new Error('Failed to fetch billing entries');
            }
            const data = await response.json();
            setBillingEntries(data);
        } catch (error) {
            console.error('Error fetching billing entries:', error);
        }
    };

    const deleteBillingEntry = async (chakkiCenter) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/customer/billing/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chakkiCenter }),
            });
            if (!response.ok) {
                throw new Error('Failed to delete billing entry');
            }
            setBillingEntries(billingEntries.filter(entry => entry.chakkiCenter !== chakkiCenter));
        } catch (error) {
            console.error('Error deleting billing entry:', error);
        }
    };

    const generateBill = (chakkiCenter) => {
        // Logic for generating the bill (could be downloading a file or rendering a bill page)
        alert(`Generating bill for ${chakkiCenter}`);
    };

    return (
        <div>
            <h1>Bill Tasks</h1>
            <ul>
                {billingEntries.map((entry, index) => (
                    <li key={index}>
                        {`Chakki Center: ${entry.chakkiCenter}, Eggs Requested: ${entry.eggsRequested}, Delivery Date: ${entry.deliveryDate}, Hatching Date: ${entry.hatchingDate}`}
                        <button onClick={() => generateBill(entry.chakkiCenter)}>Generate Bill</button>
                        <button onClick={() => deleteBillingEntry(entry.chakkiCenter)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Bill;
