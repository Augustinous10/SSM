// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Suppliers from './pages/Suppliers';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Sales from './pages/Sales';
import Purchases from './pages/Purchases';
import Debts from './pages/Debts';
import Clients from './pages/Clients';
import Notifications from './pages/Notifications';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '200px', padding: '20px', flex: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/debts" element={<Debts />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
