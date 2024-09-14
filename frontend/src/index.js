import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css'; // Import the CSS file

function MainApp() {
  useEffect(() => {
    // Dynamically add the viewport meta tag for responsiveness
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, shrink-to-fit=no';
    document.getElementsByTagName('head')[0].appendChild(meta);
  }, []);

  return <App />;
}

ReactDOM.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
  document.getElementById('root')
);
