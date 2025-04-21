// src/pages/Products.js
import React, { useState } from 'react';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Samsung Galaxy A14',
      stock: 23,
      price: 180000,
      expiryDate: '2025-12-31',
      category: 'Smartphones',
      supplier: 'SAM PHONES',
      reorderLevel: 5,
    },
    {
      id: 2,
      name: 'iPhone 12 Pro',
      stock: 7,
      price: 600000,
      expiryDate: '2026-01-15',
      category: 'Smartphones',
      supplier: 'Apple Rwanda Ltd',
      reorderLevel: 3,
    },
    {
      id: 3,
      name: 'Tecno Spark 10',
      stock: 15,
      price: 120000,
      expiryDate: '2025-04-15',
      category: 'Smartphones',
      supplier: 'Tecno Mobile',
      reorderLevel: 10,
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    stock: '',
    price: '',
    expiryDate: '',
    category: '',
    supplier: '',
    reorderLevel: '',
  });

  const [showForm, setShowForm] = useState(false);

  const handleAddProduct = () => {
    const nextId = products.length + 1;
    const productToAdd = {
      ...newProduct,
      id: nextId,
      stock: parseInt(newProduct.stock),
      price: parseInt(newProduct.price),
      reorderLevel: parseInt(newProduct.reorderLevel),
    };

    setProducts([...products, productToAdd]);
    setNewProduct({
      name: '',
      stock: '',
      price: '',
      expiryDate: '',
      category: '',
      supplier: '',
      reorderLevel: '',
    });
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const notifyLowStock = (stock, reorderLevel) => {
    return stock <= reorderLevel ? <span className="low-stock">⚠ Low Stock</span> : null;
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
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price (RWF)"
            value={newProduct.price}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="expiryDate"
            placeholder="Expiry Date"
            value={newProduct.expiryDate}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="supplier"
            placeholder="Supplier"
            value={newProduct.supplier}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="reorderLevel"
            placeholder="Reorder Level"
            value={newProduct.reorderLevel}
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
            <th>Category</th>
            <th>Supplier</th>
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
              <td>{product.category}</td>
              <td>{product.supplier}</td>
              <td>
                {notifyLowStock(product.stock, product.reorderLevel)}{' '}
                {notifyExpired(product.expiryDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
