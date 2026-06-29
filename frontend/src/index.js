import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './index.css';
import App from './App';

// Set global base URL for all axios requests
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'https://ecommerce-demo-production-2884.up.railway.app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

