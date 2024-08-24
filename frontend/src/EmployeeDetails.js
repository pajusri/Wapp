import React, { useState, useEffect } from 'react';

function EmployeeDetails() {
  const [employeeData, setEmployeeData] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  const fetchEmployeeDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:5000/employee-details');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEmployeeData(data);
    } catch (error) {
      console.error('Error fetching employee details:', error);
      setError('Failed to load employee details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error('Invalid ID:', id);
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/employee/${parseInt(id)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }

      fetchEmployeeDetails(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setEditedData(employee);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    if (!editingEmployee || !editingEmployee.id) {
      console.error('Editing employee or ID is missing');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/employee/${parseInt(editingEmployee.id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      fetchEmployeeDetails(); // Refresh the list after updating
      setEditingEmployee(null); // Clear the editing state
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Employee Details</h2>
      <button onClick={fetchEmployeeDetails}>Refresh Entries</button>
      {employeeData.length === 0 ? (
        <p>No employee data available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Department</th>
              <th>Designation</th> {/* Added designation column */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.phone_no}</td>
                <td>{employee.email_id}</td>
                <td>{employee.department}</td>
                <td>{employee.designation}</td> {/* Display designation */}
                <td>
                  <button onClick={() => handleEdit(employee)}>Edit</button>
                  <button onClick={() => handleDelete(employee.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingEmployee && (
        <div>
          <h3>Edit Employee</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleEditSubmit(); }}>
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
              name="department"
              value={editedData.department || ''}
              onChange={handleEditChange}
              placeholder="Department"
            />
            <input
              type="text"
              name="designation"
              value={editedData.designation || ''} // Added input for designation
              onChange={handleEditChange}
              placeholder="Designation"
            />

            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditingEmployee(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EmployeeDetails;
