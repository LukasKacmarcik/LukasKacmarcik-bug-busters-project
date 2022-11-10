import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './Redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchCurrentUser } from '@redux/slices/session';
import { ToastContainer } from 'react-toastify';
import { getTotals } from '@redux/slices/cart';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ToastContainer />
    <Provider store={store}>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Provider>
  </BrowserRouter>,
);
store.dispatch(fetchCurrentUser());
store.dispatch(getTotals());
