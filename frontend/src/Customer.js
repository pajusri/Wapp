import React from 'react';
import { Link, Routes, Route ,useNavigate} from 'react-router-dom';
import CustomerOnboard from './CustomerOnboard';
import CustomerDetails from './CustomerDetails';
import CustomerDetailView from './CustomerDetailView'; // New import
import CustomerRequest from './CustomerRequest';

function Customer() {
    const navigate = useNavigate();

    return (
        <div class ="wbody">
            <h1>Customer Management</h1>
            <nav>
                <ul>
                    <li><Link to="onboard">Customer Onboard</Link></li>
                    <li><Link to="details">Customer Details</Link></li>
                    <li><Link to="request">Customer Request</Link></li>
                    <button onClick={() => navigate('/welcome')}>Back to Main page</button>

                </ul>
            </nav>
            <Routes>
                <Route path="onboard" element={<CustomerOnboard />} />
                <Route path="details" element={<CustomerDetails />} />
                <Route path="details/:id" element={<CustomerDetailView />} /> {/* New Route */}
                <Route path="request" element={<CustomerRequest />} />
            </Routes>
        </div>
    );
}

export default Customer;
