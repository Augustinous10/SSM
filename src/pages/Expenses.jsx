// src/pages/Expenses.jsx
import React, { useState } from 'react';
import './Expenses.css';

function Expenses() {
  const [formVisible, setFormVisible] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: expenses.length + 1,
      ...form,
      amount: parseInt(form.amount),
    };
    setExpenses([...expenses, newExpense]);
    setForm({
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
    });
    setFormVisible(false); // hide form after submission
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="expenses-container">
      <div className="expenses-header">
        <h2 className="expenses-title">📉 Business Expenses</h2>
        <button className="toggle-expense-form-btn" onClick={() => setFormVisible(!formVisible)}>
          {formVisible ? 'Hide Form' : 'Add Expense'}
        </button>
      </div>

      {formVisible && (
        <form className="expense-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="description"
            placeholder="Description (e.g., Rent, Transport)"
            value={form.description}
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

          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">--Category--</option>
            <option value="Rent">Rent</option>
            <option value="Salaries">Salaries</option>
            <option value="Transport">Transport</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <button type="submit" className="add-expense-btn">Add Expense</button>
        </form>
      )}

      <div className="expense-summary">
        <strong>Total Expenses:</strong> RWF {totalExpenses.toLocaleString()}
      </div>

      <table className="expenses-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Amount (RWF)</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp, index) => (
            <tr key={exp.id}>
              <td>{index + 1}</td>
              <td>{exp.description}</td>
              <td>{exp.amount.toLocaleString()}</td>
              <td>{exp.category}</td>
              <td>{exp.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Expenses;
