// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import {
  FaChartBar,
  FaBoxOpen,
  FaShoppingCart,
  FaHandHoldingUsd,
  FaFileInvoice,
  FaUsers,
  FaBell,
  FaTruck,
  FaSignOutAlt
} from 'react-icons/fa';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2><FaBoxOpen style={{ marginRight: '8px' }} /> HSM</h2>
      <ul className="sidebar-links">
        <li>
          <Link to="/">
            <FaChartBar style={{ marginRight: '8px' }} />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/products">
            <FaShoppingCart style={{ marginRight: '8px' }} />
            Products
          </Link>
        </li>
        <li>
          <Link to="/sales">
            <FaHandHoldingUsd style={{ marginRight: '8px' }} />
            Sales
          </Link>
        </li>
        <li>
          <Link to="/purchases">
            <FaBoxOpen style={{ marginRight: '8px' }} />
            Purchases
          </Link>
        </li>
        <li>
          <Link to="/debts">
            <FaFileInvoice style={{ marginRight: '8px' }} />
            Debts
          </Link>
        </li>
        <li>
          <Link to="/clients">
            <FaUsers style={{ marginRight: '8px' }} />
            Clients
          </Link>
        </li>
        <li>
          <Link to="/suppliers">
            <FaTruck style={{ marginRight: '8px' }} />
            Suppliers
          </Link>
        </li>
        <li>
          <Link to="/notifications">
            <FaBell style={{ marginRight: '8px' }} />
            Notifications
          </Link>
        </li>
      </ul>

      <button className="logout-button">
        <FaSignOutAlt style={{ marginRight: '8px' }} />
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
