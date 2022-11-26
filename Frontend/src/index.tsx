import ReactDOM from 'react-dom/client';
import './styles/tailwind.css';
import App from './App';
import React from 'react';

import { worker } from './mocks/browser';
if (process.env.NODE_ENV === 'development') {
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
