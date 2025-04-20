// src/pages/Expenses.js
import React, { useState } from 'react';
import './Expenses.css';

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    date: '',
    paymentMethod: '',
  });

  const handleChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleAddExpense = () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.date || !newExpense.paymentMethod) return;

    const expenseRecord = {
      id: expenses.length + 1,
      ...newExpense,
      amount: parseFloat(newExpense.amount),
    };

    setExpenses([...expenses, expenseRecord]);
    setNewExpense({ description: '', amount: '', date: '', paymentMethod: '' });
  };

  return (
    <div className="expenses-container">
      <h1 className="expenses-title">💸 Expenses</h1>

      <div className="expense-form">
        <input
          type="text"
          name="description"
          value={newExpense.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          type="number"
          name="amount"
          value={newExpense.amount}
          onChange={handleChange}
          placeholder="Amount"
        />
        <input
          type="date"
          name="date"
          value={newExpense.date}
          onChange={handleChange}
        />
        <select
          name="paymentMethod"
          value={newExpense.paymentMethod}
          onChange={handleChange}
        >
          <option value="">-- Payment Method --</option>
          <option value="Cash">Cash</option>
          <option value="MOMO">MOMO</option>
          <option value="Airtel Money">Airtel Money</option>
          <option value="MOMO Pay">MOMO Pay</option>
          <option value="Bank">Bank</option>
        </select>
        <button onClick={handleAddExpense} className="add-expense-btn">Add Expense</button>
      </div>

      <table className="expenses-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Amount (RWF)</th>
            <th>Date</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={expense.id}>
              <td>{index + 1}</td>
              <td>{expense.description}</td>
              <td>{expense.amount.toLocaleString()}</td>
              <td>{expense.date}</td>
              <td>{expense.paymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Expenses;
