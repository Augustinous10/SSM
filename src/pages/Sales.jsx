// src/pages/Sales.js
import React, { useState } from 'react';
import './Sales.css';

function Sales() {
  const [products] = useState([
    { id: 1, name: 'Samsung Galaxy A14', stock: 23, price: 180000 },
    { id: 2, name: 'iPhone 12 Pro', stock: 7, price: 600000 },
    { id: 3, name: 'Tecno Spark 10', stock: 15, price: 120000 },
    { id: 4, name: 'pixel Spark 10', stock: 31, price: 120000 },
    { id: 5, name: 'infinix Spark 10', stock: 30, price: 120000 },
  ]);

  const [sales, setSales] = useState([]);
  const [newSale, setNewSale] = useState({
    productId: '',
    quantity: 1,
    paymentMethod: 'Cash',
  });
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    setNewSale({ ...newSale, [e.target.name]: e.target.value });
  };

  const handleAddSale = () => {
    const product = products.find(p => p.id === parseInt(newSale.productId));
    const quantity = parseInt(newSale.quantity);
    const total = product.price * quantity;

    const saleRecord = {
      id: sales.length + 1,
      productName: product.name,
      quantity,
      total,
      paymentMethod: newSale.paymentMethod,
    };

    setSales([...sales, saleRecord]);
    setNewSale({ productId: '', quantity: 1, paymentMethod: 'Cash' });
    setShowForm(false);
  };

  const getTotalFormatted = () => {
    const product = products.find(p => p.id === parseInt(newSale.productId));
    const quantity = parseInt(newSale.quantity);
    return product ? `RWF ${(product.price * quantity).toLocaleString()}` : 'RWF 0';
  };

  return (
    <div className="sales-container">
      <div className="sales-header">
        <h1 className="sales-title">📦 Sales</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="toggle-sale-form-btn"
        >
          {showForm ? 'Cancel' : '➕ Add New Sale'}
        </button>
      </div>

      {showForm && (
        <div className="sale-form">
          <select name="productId" value={newSale.productId} onChange={handleInputChange}>
            <option value="">-- Select Product --</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} ({product.stock} in stock)
              </option>
            ))}
          </select>

          <input
            type="number"
            name="quantity"
            min="1"
            value={newSale.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
          />

          <select name="paymentMethod" value={newSale.paymentMethod} onChange={handleInputChange}>
            <option value="Cash">Cash</option>
            <option value="MOMO">MOMO</option>
            <option value="Airtel Money">Airtel Money</option>
            <option value="MOMO Pay">MOMO Pay</option>
            <option value="Bank">Bank</option>
          </select>

          <span className="total-display">{getTotalFormatted()}</span>
          <button onClick={handleAddSale} className="add-sale-btn">Add Sale</button>
        </div>
      )}

      <table className="sales-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total (RWF)</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={sale.id}>
              <td>{index + 1}</td>
              <td>{sale.productName}</td>
              <td>{sale.quantity}</td>
              <td>{sale.total.toLocaleString()}</td>
              <td>{sale.paymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sales;
