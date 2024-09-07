// frontend/src/components/Purchase.js
import React from 'react';
import { Link, Route, Routes,useNavigate } from 'react-router-dom';
import FRInput from './FRInput';
import FRDisplay from './FRDisplay';
import MSCInput from './MSCInput';
import MSCDisplay from './MSCDisplay';
import FC1Input from './FC1Input';
import FC1Display from './FC1Display';
import FC2Input from './FC2Input';
import FC2Display from './FC2Display';

function Purchase() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Purchase</h2>
      <ul>
        <li><Link to="fr/input">FR Input</Link></li>
        <li><Link to="fr/display">FR Display</Link></li>
        <li><Link to="msc/input">MSC Input</Link></li>
        <li><Link to="msc/display">MSC Display</Link></li>
        <li><Link to="fc1/input">FC1 Input</Link></li>
        <li><Link to="fc1/display">FC1 Display</Link></li>
        <li><Link to="fc2/input">FC2 Input</Link></li>
        <li><Link to="fc2/display">FC2 Display</Link></li>
        <button onClick={() => navigate('/welcome')}>Back to Main page</button>

      </ul>

      <Routes>
        <Route path="fr/input" element={<FRInput />} />
        <Route path="fr/display" element={<FRDisplay />} />
        <Route path="msc/input" element={<MSCInput />} />
        <Route path="msc/display" element={<MSCDisplay />} />
        <Route path="fc1/input" element={<FC1Input />} />
        <Route path="fc1/display" element={<FC1Display />} />
        <Route path="fc2/input" element={<FC2Input />} />
        <Route path="fc2/display" element={<FC2Display />} />
      </Routes>
    </div>
  );
}

export default Purchase;
