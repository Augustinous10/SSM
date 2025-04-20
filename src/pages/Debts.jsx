// src/pages/Debts.js
import React, { useState } from 'react';
import './Debts.css';

function Debts() {
  const [products] = useState([
    { id: 1, name: 'Samsung Galaxy A14' },
    { id: 2, name: 'iPhone 12 Pro' },
    { id: 3, name: 'Tecno Spark 10' },
  ]);

  const [debts, setDebts] = useState([]);
  const [newDebt, setNewDebt] = useState({
    customer: '',
    phone: '',
    productId: '',
    amount: '',
  });

  const handleInputChange = (e) => {
    setNewDebt({ ...newDebt, [e.target.name]: e.target.value });
  };

  const handleAddDebt = () => {
    const product = products.find(p => p.id === parseInt(newDebt.productId));
    if (!product || !newDebt.customer || !newDebt.phone || !newDebt.amount) return;

    const newRecord = {
      id: debts.length + 1,
      customer: newDebt.customer,
      phone: newDebt.phone,
      productName: product.name,
      amount: parseFloat(newDebt.amount),
      date: new Date().toLocaleDateString(),
    };

    setDebts([...debts, newRecord]);
    setNewDebt({ customer: '', phone: '', productId: '', amount: '' });
  };

  return (
    <div className="debts-container">
      <h1 className="debts-title">💳 Debts</h1>

      <div className="debt-form">
        <input
          type="text"
          name="customer"
          placeholder="Customer Name"
          value={newDebt.customer}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={newDebt.phone}
          onChange={handleInputChange}
        />
        <select
          name="productId"
          value={newDebt.productId}
          onChange={handleInputChange}
        >
          <option value="">-- Select Product --</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="amount"
          placeholder="Amount (RWF)"
          value={newDebt.amount}
          onChange={handleInputChange}
        />
        <button className="add-debt-btn" onClick={handleAddDebt}>
          Add Debt
        </button>
      </div>

      <table className="debts-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {debts.map((debt, index) => (
            <tr key={debt.id}>
              <td>{index + 1}</td>
              <td>{debt.customer}</td>
              <td>{debt.phone}</td>
              <td>{debt.productName}</td>
              <td>RWF {debt.amount.toLocaleString()}</td>
              <td>{debt.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Debts;
