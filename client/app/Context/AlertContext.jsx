
// app/Context/AlertContext.js
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import Alert from '../Component/Alert'; // تأكد من المسار الصحيح

const AlertContext = createContext();

export const AlertContextProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: '', type: 'success' });

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert({ message: '', type: 'success' });
    }, 3000);
  };

  const closeAlert = () => {
    setAlert({ message: '', type: 'success' });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Alert
        notify={alert.message}
        type={alert.type}
        onClose={closeAlert}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);