import React, { useState, useEffect } from 'react';
import API_BASE_URL from './apiConfig';

function ColdStorageDisplay() {
  const [storageData, setStorageData] = useState([]);
  const [totalEggs, setTotalEggs] = useState(0);
  const [editingRecord, setEditingRecord] = useState(null);
  const [editedData, setEditedData] = useState({
    batch_no: '',
    entry_date: '',
    no_of_eggs: '',
    no_of_bundles: ''
  });

  useEffect(() => {
    fetchStorageData();
  }, []);

  const fetchStorageData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stock/cold-storage/display`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Data:', data);
      setStorageData(data);
  
      const total = data.reduce((sum, record) => sum + parseInt(record.no_of_eggs, 10), 0);
      setTotalEggs(total);
    } catch (error) {
      console.error('Error fetching storage data:', error);
    }
  };
  
  
  const handleEdit = (record) => {
    setEditingRecord(record.id);
    setEditedData(record);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/stock/cold-storage/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update entry');
      }

      setEditingRecord(null);
      fetchStorageData(); // Refresh the data after editing
    } catch (error) {
      console.error('Error updating entry:', error);
      alert('Failed to update entry');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/stock/cold-storage/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete entry');
        }
        alert('Entry deleted successfully');
        fetchStorageData(); // Refresh the data after deletion
      } catch (error) {
        console.error('Error deleting entry:', error);
        alert('Failed to delete entry');
      }
    }
  };

  return (
    <div>
      <h2>Cold Storage Data</h2>
      <h3>Total Eggs in Cold Storage: {totalEggs}</h3>
      {storageData.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Batch No</th>
              <th>Entry Date</th>
              <th>No of Eggs</th>
              <th>No of Bundles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {storageData.map((record) => (
              <tr key={record.id}>
                {editingRecord === record.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="batch_no"
                        value={editedData.batch_no}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="entry_date"
                        value={editedData.entry_date}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="no_of_eggs"
                        value={editedData.no_of_eggs}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="no_of_bundles"
                        value={editedData.no_of_bundles}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleEditSubmit(record.id)}>Save</button>
                      <button onClick={() => setEditingRecord(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{record.batch_no}</td>
                    <td>{record.entry_date}</td>
                    <td>{record.no_of_eggs}</td>
                    <td>{record.no_of_bundles}</td>
                    <td>
                      <button onClick={() => handleEdit(record)}>Edit</button>
                      <button onClick={() => handleDelete(record.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ColdStorageDisplay;
