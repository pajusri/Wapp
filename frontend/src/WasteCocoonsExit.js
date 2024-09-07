import React, { useState } from 'react';

function WasteCocoonsExit() {
  const [breed, setBreed] = useState('');
  const [kgs, setKgs] = useState('');
  const [message, setMessage] = useState('');

  const breedOptions = ['FR', 'MSC', 'FC1', 'FC2'];  // Example breed options

  const handleSubmit = async (e) => {
    e.preventDefault();

    const exitData = { breed, kgs };

    try {
      const response = await fetch('http://127.0.0.1:5000/waste_cocoons/exit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exitData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`Exit successful: ${result.message}`);
        setBreed('');
        setKgs('');
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error submitting exit data.');
    }
  };

  return (
    <div>
      <h2>Waste Cocoons Exit</h2>
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
      {message && <p>{message}</p>}
    </div>
  );
}

export default WasteCocoonsExit;
