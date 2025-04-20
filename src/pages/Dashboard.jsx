import React, { useState, useEffect, useCallback } from 'react';
import './Dashboard.css';

const sampleDebts = [
  { id: 1, amount: 10000, date: '2025-04-01' },
  { id: 2, amount: 25000, date: '2025-03-28' },
  { id: 3, amount: 5000, date: '2025-02-14' },
  { id: 4, amount: 12000, date: '2024-12-01' },
  { id: 5, amount: 8000, date: '2025-04-20' },
];

const sampleProducts = [
  { id: 1, name: 'Milk', expiry: '2025-03-30' },
  { id: 2, name: 'Yogurt', expiry: '2025-04-10' },
  { id: 3, name: 'Bread', expiry: '2025-04-21' }, // today
  { id: 4, name: 'Butter', expiry: '2025-04-15' },
  { id: 5, name: 'Juice', expiry: '2025-02-01' },
];

function Dashboard() {
  const [filteredDebts, setFilteredDebts] = useState([]);
  const [expiredProducts, setExpiredProducts] = useState([]);
  const [filter, setFilter] = useState('1month');
  const [customRange, setCustomRange] = useState({ from: '', to: '' });

  const filterData = useCallback(() => {
    const now = new Date();
    let fromDate;

    switch (filter) {
      case '1day':
        fromDate = new Date(now);
        fromDate.setDate(now.getDate() - 1);
        break;
      case '7days':
        fromDate = new Date(now);
        fromDate.setDate(now.getDate() - 7);
        break;
      case '2weeks':
        fromDate = new Date(now);
        fromDate.setDate(now.getDate() - 14);
        break;
      case '3weeks':
        fromDate = new Date(now);
        fromDate.setDate(now.getDate() - 21);
        break;
      case '1month':
        fromDate = new Date(now);
        fromDate.setMonth(now.getMonth() - 1);
        break;
      case '3months':
        fromDate = new Date(now);
        fromDate.setMonth(now.getMonth() - 3);
        break;
      case '1year':
        fromDate = new Date(now);
        fromDate.setFullYear(now.getFullYear() - 1);
        break;
      case 'custom':
        if (customRange.from && customRange.to) {
          const from = new Date(customRange.from);
          const to = new Date(customRange.to);

          setFilteredDebts(
            sampleDebts.filter(d => {
              const dDate = new Date(d.date);
              return dDate >= from && dDate <= to;
            })
          );

          setExpiredProducts(
            sampleProducts.filter(p => {
              const expiry = new Date(p.expiry);
              return expiry <= now && expiry >= from;
            })
          );

          return;
        }
        break;
      default:
        fromDate = new Date(0);
    }

    setFilteredDebts(
      sampleDebts.filter(d => new Date(d.date) >= fromDate)
    );

    setExpiredProducts(
      sampleProducts.filter(p => {
        const expiry = new Date(p.expiry);
        return expiry <= now && expiry >= fromDate;
      })
    );
  }, [filter, customRange]);

  useEffect(() => {
    filterData();
  }, [filterData]);

  const totalDebtAmount = filteredDebts.reduce((acc, d) => acc + d.amount, 0);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📊 Dashboard</h1>

      <div className="filter-section">
        <label>Filter:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="1day">1 Day</option>
          <option value="7days">7 Days</option>
          <option value="2weeks">2 Weeks</option>
          <option value="3weeks">3 Weeks</option>
          <option value="1month">1 Month</option>
          <option value="3months">3 Months</option>
          <option value="1year">1 Year</option>
          <option value="lifetime">Lifetime</option>
          <option value="custom">Custom</option>
        </select>

        {filter === 'custom' && (
          <div className="custom-date-range">
            <input
              type="date"
              value={customRange.from}
              onChange={(e) => setCustomRange({ ...customRange, from: e.target.value })}
            />
            <input
              type="date"
              value={customRange.to}
              onChange={(e) => setCustomRange({ ...customRange, to: e.target.value })}
            />
          </div>
        )}
      </div>

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
        <div className="card">
          <div className="card-title">Total Debts</div>
          <div className="card-value">RWF {totalDebtAmount.toLocaleString()}</div>
        </div>
        <div className="card">
          <div className="card-title">Total Expired Products</div>
          <div className="card-value">{expiredProducts.length}</div>
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
