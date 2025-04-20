// src/pages/Purchases.js
import React, { useState } from 'react';
import './Purchases.css';

function Purchases() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Samsung Galaxy A14', stock: 23 },
    { id: 2, name: 'iPhone 12 Pro', stock: 7 },
    { id: 3, name: 'Tecno Spark 10', stock: 15 },
  ]);

  const [purchases, setPurchases] = useState([]);
  const [newPurchase, setNewPurchase] = useState({ productId: '', quantity: '' });

  const handleInputChange = (e) => {
    setNewPurchase({ ...newPurchase, [e.target.name]: e.target.value });
  };

  const handleAddPurchase = () => {
    const productIndex = products.findIndex(p => p.id === parseInt(newPurchase.productId));
    const quantity = parseInt(newPurchase.quantity);

    if (productIndex !== -1 && quantity > 0) {
      const updatedProducts = [...products];
      updatedProducts[productIndex].stock += quantity;
      setProducts(updatedProducts);

      const newRecord = {
        id: purchases.length + 1,
        productName: updatedProducts[productIndex].name,
        quantity,
        date: new Date().toLocaleDateString(),
      };

      setPurchases([...purchases, newRecord]);
      setNewPurchase({ productId: '', quantity: '' });
    }
  };

  return (
    <div className="purchases-container">
      <div className="purchases-header">
        <h1 className="purchases-title">📥 Purchases</h1>
      </div>

      <div className="purchase-form">
        <select name="productId" value={newPurchase.productId} onChange={handleInputChange}>
          <option value="">-- Select Product --</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name} (Stock: {product.stock})
            </option>
          ))}
        </select>
        <input
          type="number"
          name="quantity"
          placeholder="Quantity Purchased"
          value={newPurchase.quantity}
          onChange={handleInputChange}
          min="1"
        />
        <button onClick={handleAddPurchase} className="add-purchase-btn">Add Purchase</button>
      </div>

      <table className="purchases-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase, index) => (
            <tr key={purchase.id}>
              <td>{index + 1}</td>
              <td>{purchase.productName}</td>
              <td>{purchase.quantity}</td>
              <td>{purchase.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Purchases;
