// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
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
  FaSignOutAlt,
  FaArrowCircleUp,     // NEW: For Income
  FaArrowCircleDown    // NEW: For Expenses
} from 'react-icons/fa';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2><FaBoxOpen style={{ marginRight: '8px' }} /> HSM</h2>
      <ul className="sidebar-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>
            <FaChartBar style={{ marginRight: '8px' }} />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className={({ isActive }) => isActive ? 'active-link' : ''}>
            <FaShoppingCart style={{ marginRight: '8px' }} />
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/sales" className={({ isActive }) => isActive ? 'active-link' : ''}>
            <FaHandHoldingUsd style={{ marginRight: '8px' }} />
            Sales
          </NavLink>
        </li>
        <li>
          <NavLink to="/income" className={({ isActive }) => isActive ? 'active-link' : ''}>
            <FaArrowCircleUp style={{ marginRight: '8px' }} />
            Income
          </NavLink>
        </li>
        <li>
          <NavLink to="/expenses" className={({ isActive }) => isActive ? 'active-link' : ''}>
            <FaArrowCircleDown style={{ marginRight: '8px' }} />
            Expenses
          </NavLink>
        </li>
        <li>
          <NavLink to="/purchases" className={({ isActive }) => isActive ? 'active-link' : ''}>
            <FaBoxOpen style={{ marginRight: '8px' }} />
            Purchases
          </NavLink>
        </li>
        <li>
          <NavLink to="/debts" className={({ isActive }) => isActive ? 'active-link' : ''}>
            <FaFileInvoice style={{ marginRight: '8px' }} />
            Debts
          </NavLink>
        </li>
        <li>
          <NavLink to="/clients" className={({ isActive }) => isActive ? 'active-link' : ''}>
            <FaUsers style={{ marginRight: '8px' }} />
            Clients
          </NavLink>
        </li>
        <li>
          <NavLink to="/suppliers" className={({ isActive }) => isActive ? 'active-link' : ''}>
            <FaTruck style={{ marginRight: '8px' }} />
            Suppliers
          </NavLink>
        </li>
        <li>
          <NavLink to="/notifications" className={({ isActive }) => isActive ? 'active-link' : ''}>
            <FaBell style={{ marginRight: '8px' }} />
            Notifications
          </NavLink>
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
