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
  { id: 3, name: 'Bread', expiry: '2025-04-21' },
  { id: 4, name: 'Butter', expiry: '2025-04-15' },
  { id: 5, name: 'Juice', expiry: '2025-02-01' },
];

const sampleIncome = [
  { id: 1, amount: 60000, date: '2025-04-01' },
  { id: 2, amount: 30000, date: '2025-03-20' },
  { id: 3, amount: 15000, date: '2025-02-10' },
];

const sampleExpenses = [
  { id: 1, amount: 20000, date: '2025-04-02' },
  { id: 2, amount: 12000, date: '2025-03-15' },
  { id: 3, amount: 18000, date: '2025-01-25' },
];

function Dashboard() {
  const [filteredDebts, setFilteredDebts] = useState([]);
  const [expiredProducts, setExpiredProducts] = useState([]);
  const [filteredIncome, setFilteredIncome] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filter, setFilter] = useState('1month');
  const [customRange, setCustomRange] = useState({ from: '', to: '' });

  const applyFilters = useCallback(() => {
    const now = new Date();
    let fromDate = new Date(0);

    if (filter === 'custom' && customRange.from && customRange.to) {
      const customFrom = new Date(customRange.from);
      const customTo = new Date(customRange.to);

      setFilteredDebts(sampleDebts.filter(({ date }) => new Date(date) >= customFrom && new Date(date) <= customTo));
      setExpiredProducts(sampleProducts.filter(({ expiry }) => new Date(expiry) >= customFrom && new Date(expiry) <= now));
      setFilteredIncome(sampleIncome.filter(({ date }) => new Date(date) >= customFrom && new Date(date) <= customTo));
      setFilteredExpenses(sampleExpenses.filter(({ date }) => new Date(date) >= customFrom && new Date(date) <= customTo));
      return;
    }

    switch (filter) {
      case '1day': fromDate = new Date(now); fromDate.setDate(now.getDate() - 1); break;
      case '7days': fromDate = new Date(now); fromDate.setDate(now.getDate() - 7); break;
      case '2weeks': fromDate = new Date(now); fromDate.setDate(now.getDate() - 14); break;
      case '3weeks': fromDate = new Date(now); fromDate.setDate(now.getDate() - 21); break;
      case '1month': fromDate = new Date(now); fromDate.setMonth(now.getMonth() - 1); break;
      case '3months': fromDate = new Date(now); fromDate.setMonth(now.getMonth() - 3); break;
      case '1year': fromDate = new Date(now); fromDate.setFullYear(now.getFullYear() - 1); break;
      case 'lifetime': fromDate = new Date(0); break;
      default: break;
    }

    setFilteredDebts(sampleDebts.filter(({ date }) => new Date(date) >= fromDate));
    setExpiredProducts(sampleProducts.filter(({ expiry }) => {
      const exp = new Date(expiry);
      return exp >= fromDate && exp <= now;
    }));
    setFilteredIncome(sampleIncome.filter(({ date }) => new Date(date) >= fromDate));
    setFilteredExpenses(sampleExpenses.filter(({ date }) => new Date(date) >= fromDate));
  }, [filter, customRange]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const totalDebtAmount = filteredDebts.reduce((acc, { amount }) => acc + amount, 0);
  const totalIncome = filteredIncome.reduce((acc, { amount }) => acc + amount, 0);
  const totalExpenses = filteredExpenses.reduce((acc, { amount }) => acc + amount, 0);

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
              onChange={(e) => setCustomRange((prev) => ({ ...prev, from: e.target.value }))}
            />
            <input
              type="date"
              value={customRange.to}
              onChange={(e) => setCustomRange((prev) => ({ ...prev, to: e.target.value }))}
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
          <div className="card-title">Expired Products</div>
          <div className="card-value">{expiredProducts.length}</div>
        </div>
        <div className="card">
          <div className="card-title">Total Income</div>
          <div className="card-value">RWF {totalIncome.toLocaleString()}</div>
        </div>
        <div className="card">
          <div className="card-title">Total Expenses</div>
          <div className="card-value">RWF {totalExpenses.toLocaleString()}</div>
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
