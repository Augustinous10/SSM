// src/pages/Debts.js
import React, { useState } from 'react';
import './Debts.css';

function Debts() {
  const [debts, setDebts] = useState([]);
  const [newDebt, setNewDebt] = useState({
    name: '',
    phone: '',
    amount: '',
    date: '',
  });
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    setNewDebt({ ...newDebt, [e.target.name]: e.target.value });
  };

  const handleAddDebt = () => {
    const debtRecord = {
      id: debts.length + 1,
      name: newDebt.name,
      phone: newDebt.phone,
      amount: parseFloat(newDebt.amount),
      date: newDebt.date,
    };

    setDebts([...debts, debtRecord]);
    setNewDebt({ name: '', phone: '', amount: '', date: '' });
    setShowForm(false);
  };

  return (
    <div className="debts-container">
      <div className="debts-header">
        <h1 className="debts-title">💸 Debts</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="toggle-debt-form-btn"
        >
          {showForm ? 'Cancel' : '➕ Add New Debt'}
        </button>
      </div>

      {showForm && (
        <div className="debt-form">
          <input
            type="text"
            name="name"
            value={newDebt.name}
            onChange={handleInputChange}
            placeholder="Debtor's Name"
          />
          <input
            type="tel"
            name="phone"
            value={newDebt.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
          />
          <input
            type="number"
            name="amount"
            value={newDebt.amount}
            onChange={handleInputChange}
            placeholder="Amount (RWF)"
          />
          <input
            type="date"
            name="date"
            value={newDebt.date}
            onChange={handleInputChange}
            placeholder="Date"
          />
          <button onClick={handleAddDebt} className="add-debt-btn">Add Debt</button>
        </div>
      )}

      <table className="debts-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Debtor</th>
            <th>Phone</th>
            <th>Amount (RWF)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {debts.map((debt, index) => (
            <tr key={debt.id}>
              <td>{index + 1}</td>
              <td>{debt.name}</td>
              <td>{debt.phone}</td>
              <td>{debt.amount.toLocaleString()}</td>
              <td>{debt.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Debts;
