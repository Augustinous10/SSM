import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📊 Dashboard</h1>

      <div className="cards">
        <div className="card">
          <div className="card-title">Today’s Sales</div>
          <div className="card-value">RWF 120,000</div>
        </div>
        <div className="card">
          <div className="card-title">Total Products</div>
          <div className="card-value">54</div>
        </div>
        <div className="card">
          <div className="card-title">Out of Stock</div>
          <div className="card-value">3</div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Sales Chart (coming soon)</div>
        <div className="chart-placeholder">[Chart Placeholder]</div>
      </div>
    </div>
  );
}

export default Dashboard;
