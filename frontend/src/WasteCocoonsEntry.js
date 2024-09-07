import React, { useState } from 'react';

function WasteCocoonsEntry() {
  const [breed, setBreed] = useState('');
  const [kgs, setKgs] = useState('');

  // Array of available breed options
  const breedOptions = ['FR', 'MSC', 'FC1', 'FC2'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const entryData = { breed, kgs };

    try {
      const response = await fetch('http://127.0.0.1:5000/waste_cocoons/entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entryData),
      });

      if (response.ok) {
        alert('Data successfully submitted!');
        setBreed('');
        setKgs('');
      } else {
        alert('Error submitting data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting data');
    }
  };

  return (
    <div>
      <h2>Waste Cocoons Entry</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Breed:
          <select
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          >
            <option value="" disabled>Select a breed</option>
            {breedOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Kgs:
          <input
            type="number"
            value={kgs}
            onChange={(e) => setKgs(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default WasteCocoonsEntry;
