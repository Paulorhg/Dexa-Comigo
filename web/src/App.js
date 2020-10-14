import React from 'react';
import { ToastProvider } from 'react-toast-notifications'

import './all.css'

import Routes from './routes'

const App = () => {
  return (
    <ToastProvider>
      <Routes />
    </ToastProvider>
  );
}

export default App;
