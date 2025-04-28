// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar'; // ✅ Import the Navbar
import Sidebar from './components/Sidebar';
import Suppliers from './pages/Suppliers';
import Income from './pages/Income';
import Expenses from './pages/Expenses';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Sales from './pages/Sales';
import Purchases from './pages/Purchases';
import Pettycash from './pages/Pettycash';
import Debts from './pages/Debts';
import Clients from './pages/Clients';
import Report from './pages/Report';
import Notifications from './pages/Notifications';

function App() {
  const handleSignOut = () => {
    // Example logic: Clear user session, redirect, etc.
    console.log('User signed out');
  };

  return (
    <Router>
      <div>
        <Navbar onSignOut={handleSignOut} /> {/* ✅ Top navigation */}

        <div style={{ display: 'flex' }}>
          <Sidebar /> {/* Sidebar on the left */}

          <div style={{ marginLeft: '200px', padding: '20px', flex: 1 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/products" element={<Products />} />
              <Route path="/income" element={<Income />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/debts" element={<Debts />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/pettycash" element={<Pettycash />} />
              <Route path="/report" element={<Report />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
