// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // you can style this file yourself

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>🛍️ Shop Manager</h2>
      <nav>
        <ul>
          <li><Link to="/">📊 Dashboard</Link></li>
          <li><Link to="/products">🛒 Products</Link></li>
          <li><Link to="/sales">💰 Sales</Link></li>
          <li><Link to="/purchases">📦 Purchases</Link></li>
          <li><Link to="/debts">📄 Debts</Link></li>
          <li><Link to="/clients">👥 Clients</Link></li>
          <li><Link to="/notifications">🔔 Notifications</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
