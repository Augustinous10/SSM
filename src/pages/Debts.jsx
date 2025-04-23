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
    dueDate: '', // NEW FIELD
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    setNewDebt({ ...newDebt, [e.target.name]: e.target.value });
  };

  const handleAddDebt = () => {
    if (!newDebt.name || !newDebt.amount || !newDebt.date || !newDebt.dueDate) return;

    if (editingId) {
      const updatedDebts = debts.map((debt) =>
        debt.id === editingId
          ? { ...debt, ...newDebt, amount: parseFloat(newDebt.amount) }
          : debt
      );
      setDebts(updatedDebts);
      setEditingId(null);
    } else {
      const debtRecord = {
        id: debts.length + 1,
        name: newDebt.name,
        phone: newDebt.phone,
        amount: parseFloat(newDebt.amount),
        date: newDebt.date,
        dueDate: newDebt.dueDate,
        isPaid: false,
      };
      setDebts([...debts, debtRecord]);
    }

    setNewDebt({ name: '', phone: '', amount: '', date: '', dueDate: '' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setDebts(debts.filter((debt) => debt.id !== id));
  };

  const handleEdit = (debt) => {
    setNewDebt({
      name: debt.name,
      phone: debt.phone,
      amount: debt.amount,
      date: debt.date,
      dueDate: debt.dueDate,
    });
    setEditingId(debt.id);
    setShowForm(true);
  };

  const togglePaidStatus = (id) => {
    const updatedDebts = debts.map((debt) =>
      debt.id === id ? { ...debt, isPaid: !debt.isPaid } : debt
    );
    setDebts(updatedDebts);
  };

  return (
    <div className="debts-container">
      <div className="debts-header">
        <h1 className="debts-title">💸 Debts</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setNewDebt({ name: '', phone: '', amount: '', date: '', dueDate: '' });
          }}
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
          />
          <input
            type="date"
            name="dueDate"
            value={newDebt.dueDate}
            onChange={handleInputChange}
            placeholder="Date to Pay"
          />
          <button onClick={handleAddDebt} className="add-debt-btn">
            {editingId ? 'Update Debt' : 'Add Debt'}
          </button>
        </div>
      )}

      <table className="debts-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Debtor</th>
            <th>Phone</th>
            <th>Amount (RWF)</th>
            <th>Borrowed Date</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
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
              <td>{debt.dueDate}</td>
              <td style={{ color: debt.isPaid ? 'green' : 'red', fontWeight: 'bold' }}>
                {debt.isPaid ? 'Paid' : 'Unpaid'}
              </td>
              <td>
                <button onClick={() => togglePaidStatus(debt.id)} className="mark-paid-btn">
                  {debt.isPaid ? 'Unmark Paid' : 'Mark as Paid'}
                </button>{' '}
                <button onClick={() => handleEdit(debt)} className="edit-btn">
                  ✏️ Edit
                </button>{' '}
                <button onClick={() => handleDelete(debt.id)} className="delete-btn">
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Debts;
