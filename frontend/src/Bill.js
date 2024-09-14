import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './apiConfig';

function Bill() {
    const navigate = useNavigate();
    const [billingEntries, setBillingEntries] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        chakkiCenter: '',
        variety: '',
        race: '',
        lotNo: '',
        laidDate: '',
        ronDate: '',
        ehDate: '',
        quantity: '',
        rate: ''
    });

    useEffect(() => {
        fetchBillingEntries();
    }, []);

    const fetchBillingEntries = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/billing-entries?timestamp=${new Date().getTime()}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch billing entries: ${response.statusText}`);
            }
            const data = await response.json();
            console.log("Fetched billing entries:", data);
            setBillingEntries(data);
        } catch (error) {
            console.error('Error fetching billing entries:', error);
        }
    };
    
    

    const deleteBillingEntry = async (chakkiCenter) => {
        try {
            const response = await fetch(`${API_BASE_URL}/billing/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chakkiCenter }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete billing entry');
            }

            // Remove the deleted entry from the local state
            setBillingEntries(billingEntries.filter(entry => entry.chakkiCenter !== chakkiCenter));
        } catch (error) {
            console.error('Error deleting billing entry:', error);
        }
    };

    const openGenerateBillModal = (chakkiCenter) => {
        setFormData({ ...formData, chakkiCenter });
        setShowModal(true);
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const generateBill = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/billing/generate-bill`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to generate bill');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Bill_${formData.chakkiCenter}.pdf`);
            document.body.appendChild(link);
            link.click();
            setShowModal(false);
        } catch (error) {
            console.error('Error generating bill:', error);
        }
    };

    return (
        <div className="wbody">
            <h1>Billing Tasks</h1>
            <ul>
                {billingEntries.length === 0 ? (
                    <p>No billing entries found.</p>
                ) : (
                    billingEntries.map((entry, index) => (
                        <li key={index}>
                            {`Chakki Center: ${entry.chakkiCenter}, Eggs Requested: ${entry.eggsRequested}, Delivery Date: ${entry.deliveryDate}, Hatching Date: ${entry.hatchingDate}`}
                            <button onClick={() => openGenerateBillModal(entry.chakkiCenter)}>Generate Bill</button>
                            <button onClick={() => deleteBillingEntry(entry.chakkiCenter)}>Delete</button>
                        </li>
                    ))
                )}
                <button onClick={() => navigate('/welcome')}>Back to Main page</button>
            </ul>

            {showModal && (
                <div className="modal">
                    <h2>Enter Details to Generate Bill</h2>
                    <form>
                        <div>
                            <label>Variety:</label>
                            <input
                                type="text"
                                name="variety"
                                value={formData.variety}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Race:</label>
                            <input
                                type="text"
                                name="race"
                                value={formData.race}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Lot No:</label>
                            <input
                                type="text"
                                name="lotNo"
                                value={formData.lotNo}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Laid Date:</label>
                            <input
                                type="date"
                                name="laidDate"
                                value={formData.laidDate}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>R/On Date:</label>
                            <input
                                type="date"
                                name="ronDate"
                                value={formData.ronDate}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>E.H Date:</label>
                            <input
                                type="date"
                                name="ehDate"
                                value={formData.ehDate}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Quantity:</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Rate:</label>
                            <input
                                type="number"
                                name="rate"
                                value={formData.rate}
                                onChange={handleFormChange}
                            />
                        </div>
                        <button type="button" onClick={generateBill}>Generate Bill</button>
                        <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Bill;
