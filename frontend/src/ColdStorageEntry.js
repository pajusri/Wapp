import React, { useState } from 'react';

function ColdStorageEntry() {
  const [batchNo, setBatchNo] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [noOfEggs, setNoOfEggs] = useState('');
  const [noOfBundles, setNoOfBundles] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    const data = { batch_no: batchNo, entry_date: entryDate, no_of_eggs: noOfEggs, no_of_bundles: noOfBundles };

    try {
      const response = await fetch('http://127.0.0.1:5000/stock/cold-storage/entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('Data submitted successfully');
        // Clear the form after successful submission
        setBatchNo('');
        setEntryDate('');
        setNoOfEggs('');
        setNoOfBundles('');
      } else {
        alert('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    } finally {
      setIsSubmitting(false); // Re-enable the button after submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Batch No:
        <input type="text" value={batchNo} onChange={(e) => setBatchNo(e.target.value)} required />
      </label>
      <label>
        Entry Date:
        <input type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} required />
      </label>
      <label>
        No of Eggs:
        <input type="number" value={noOfEggs} onChange={(e) => setNoOfEggs(e.target.value)} required />
      </label>
      <label>
        No of Bundles:
        <input type="number" value={noOfBundles} onChange={(e) => setNoOfBundles(e.target.value)} required />
      </label>
      <button type="submit" disabled={isSubmitting}>Submit</button>
    </form>
  );
}

export default ColdStorageEntry;
