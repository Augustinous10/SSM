// src/pages/Income.js
import React, { useState } from 'react';
import './Income.css';

function Income() {
  const [incomeData, setIncomeData] = useState([]);
  const [form, setForm] = useState({
    source: '',
    amount: '',
    date: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.source || !form.amount || !form.date) return;

    setIncomeData([...incomeData, form]);
    setForm({ source: '', amount: '', date: '' });
  };

  return (
    <div className="income-container">
      <h2>Income Records</h2>

      <form onSubmit={handleSubmit} className="income-form">
        <input
          type="text"
          name="source"
          placeholder="Income Source"
          value={form.source}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount (RWF)"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Income</button>
      </form>

      <table className="income-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Source</th>
            <th>Amount (RWF)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {incomeData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.source}</td>
              <td>{item.amount}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Income;
