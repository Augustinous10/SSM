// src/pages/Products.js
import React, { useState } from 'react';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Samsung Galaxy A14', stock: 23, price: 180000, expiryDate: '2025-12-31' },
    { id: 2, name: 'iPhone 12 Pro', stock: 7, price: 600000, expiryDate: '2026-01-15' },
    { id: 3, name: 'Tecno Spark 10', stock: 15, price: 120000, expiryDate: '2025-04-15' }, // expired
  ]);

  const [newProduct, setNewProduct] = useState({ name: '', stock: '', price: '', expiryDate: '' });
  const [showForm, setShowForm] = useState(false);

  const handleAddProduct = () => {
    const nextId = products.length + 1;
    const productToAdd = {
      id: nextId,
      name: newProduct.name,
      stock: parseInt(newProduct.stock),
      price: parseInt(newProduct.price),
      expiryDate: newProduct.expiryDate,
    };
    setProducts([...products, productToAdd]);
    setNewProduct({ name: '', stock: '', price: '', expiryDate: '' });
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const notifyLowStock = (stock) => {
    return stock < 10 ? <span className="low-stock">⚠ Low</span> : null;
  };

  const notifyExpired = (expiryDate) => {
    const today = new Date();
    const expDate = new Date(expiryDate);
    return expDate < today ? <span className="expired">❌ Expired</span> : null;
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <h1 className="products-title">🛒 Products</h1>
        <button className="add-product-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {showForm && (
        <div className="product-form">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="expiryDate"
            placeholder="Expiry Date"
            value={newProduct.expiryDate}
            onChange={handleInputChange}
          />
          <button onClick={handleAddProduct} className="save-product-btn">Save</button>
        </div>
      )}

      <table className="products-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Expiry</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td>RWF {product.price.toLocaleString()}</td>
              <td>{product.expiryDate}</td>
              <td>
                {notifyLowStock(product.stock)} {notifyExpired(product.expiryDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
