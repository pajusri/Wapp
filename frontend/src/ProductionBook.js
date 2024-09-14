import React from 'react';
import { useNavigate} from 'react-router-dom';


function ProductionBook() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Production Book</h2>
      <p>This page will contain details about the production book.</p>
      <button onClick={() => navigate('/welcome')}>Back to Main page</button>
    </div>
  );
}

export default ProductionBook;
