import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/scss/main.scss';

function ToasterContainer() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}

export default ToasterContainer;
