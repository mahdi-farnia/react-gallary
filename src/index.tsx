import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import ScrollObserver from './utils/ScrollObserver';
import FileProvider from './utils/FileProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ScrollObserver>
      <FileProvider>
        <App />
      </FileProvider>
    </ScrollObserver>
  </React.StrictMode>
);
