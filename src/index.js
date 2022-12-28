import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './main.css'
import initLocalStorage from './lib/initLocalStorage'

initLocalStorage()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
