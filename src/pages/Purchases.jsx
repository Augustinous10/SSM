// src/pages/Purchases.js
import React, { useState } from 'react';
import './Purchases.css';

function Purchases() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Samsung Galaxy A14', stock: 23 },
    { id: 2, name: 'iPhone 12 Pro', stock: 7 },
    { id: 3, name: 'Tecno Spark 10', stock: 15 },
  ]);

  const [suppliers] = useState([
    { id: 1, name: 'MobileTech Ltd' },
    { id: 2, name: 'SmartWorld Suppliers' },
    { id: 3, name: 'Gadget Zone Inc' },
  ]);

  const [purchases, setPurchases] = useState([]);
  const [newPurchase, setNewPurchase] = useState({ productId: '', quantity: '', supplierId: '', unitPrice: '' });
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    setNewPurchase({ ...newPurchase, [e.target.name]: e.target.value });
  };

  const handleAddPurchase = () => {
    const productIndex = products.findIndex(p => p.id === parseInt(newPurchase.productId));
    const supplier = suppliers.find(s => s.id === parseInt(newPurchase.supplierId));
    const quantity = parseInt(newPurchase.quantity);
    const unitPrice = parseFloat(newPurchase.unitPrice);

    if (productIndex !== -1 && quantity > 0 && unitPrice > 0 && supplier) {
      const updatedProducts = [...products];
      updatedProducts[productIndex].stock += quantity;
      setProducts(updatedProducts);

      const newRecord = {
        id: purchases.length + 1,
        productName: updatedProducts[productIndex].name,
        supplierName: supplier.name,
        quantity,
        unitPrice,
        totalCost: quantity * unitPrice,
        date: new Date().toLocaleDateString(),
      };

      setPurchases([...purchases, newRecord]);
      setNewPurchase({ productId: '', quantity: '', supplierId: '', unitPrice: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="purchases-container">
      <div className="purchases-header">
        <h1 className="purchases-title">📥 Purchases</h1>
        <button className="toggle-form-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Hide Form' : '➕ Add New Purchase'}
        </button>
      </div>

      {showForm && (
        <div className="purchase-form">
          <select name="supplierId" value={newPurchase.supplierId} onChange={handleInputChange}>
            <option value="">-- Select Supplier --</option>
            {suppliers.map(supplier => (
              <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
            ))}
          </select>

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

          <input
            type="number"
            name="unitPrice"
            placeholder="Unit Price"
            value={newPurchase.unitPrice}
            onChange={handleInputChange}
            min="0.01"
            step="0.01"
          />

          <button onClick={handleAddPurchase} className="add-purchase-btn">Add Purchase</button>
        </div>
      )}

      <table className="purchases-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Cost</th>
            <th>Supplier</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase, index) => (
            <tr key={purchase.id}>
              <td>{index + 1}</td>
              <td>{purchase.productName}</td>
              <td>{purchase.quantity}</td>
              <td>{purchase.unitPrice.toFixed(2)} RWF</td>
              <td>{purchase.totalCost.toFixed(2)} RWF</td>
              <td>{purchase.supplierName}</td>
              <td>{purchase.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Purchases;
