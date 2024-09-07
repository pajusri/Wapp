import React from 'react';
import { Link, Routes, Route ,useNavigate} from 'react-router-dom';
import EmployeeOnboard from './EmployeeOnboard'; // Import the EmployeeOnboard component
import EmployeeDetails from './EmployeeDetails'; // Import the EmployeeDetails component

function Employee() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Employee Management</h1>
      <nav>
        <ul>
          <li>
            <Link to="onboard">Employee Onboard</Link>
          </li>
          <li>
            <Link to="details">Employee Details</Link>
          </li>
        </ul>
        <button onClick={() => navigate('/welcome')}>Back to Welcome</button>

      </nav>

      <Routes>
        <Route path="onboard" element={<EmployeeOnboard />} />
        <Route path="details" element={<EmployeeDetails />} />
      </Routes>
    </div>
  );
}

export default Employee;
