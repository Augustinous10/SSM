import React, { useState } from 'react';
import './Sales.css';

const initialProducts = [
  { id: 1, name: 'Samsung Galaxy A14', stock: 23, price: 180000 },
  { id: 2, name: 'iPhone 12 Pro', stock: 7, price: 600000 },
  { id: 3, name: 'Tecno Spark 10', stock: 15, price: 120000 },
];

function Sales() {
  const [products, setProducts] = useState(initialProducts);
  const [sales, setSales] = useState([]);
  const [showForm, setShowForm] = useState(false); // Toggle control
  const [form, setForm] = useState({
    productId: '',
    quantity: '',
    client: '',
    date: new Date().toISOString().split('T')[0],
  });

  const selectedProduct = products.find(p => p.id === parseInt(form.productId));
  const total = selectedProduct ? selectedProduct.price * form.quantity : 0;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productIndex = products.findIndex(p => p.id === parseInt(form.productId));
    const quantity = parseInt(form.quantity);

    if (productIndex === -1 || quantity <= 0 || quantity > products[productIndex].stock) return;

    const updatedProducts = [...products];
    updatedProducts[productIndex].stock -= quantity;

    const newSale = {
      id: sales.length + 1,
      product: updatedProducts[productIndex].name,
      quantity,
      price: updatedProducts[productIndex].price,
      total: updatedProducts[productIndex].price * quantity,
      client: form.client || 'Walk-in',
      date: form.date,
    };

    setSales([...sales, newSale]);
    setProducts(updatedProducts);
    setForm({ productId: '', quantity: '', client: '', date: new Date().toISOString().split('T')[0] });
    setShowForm(false); // Hide form after submit
  };

  return (
    <div className="sales-container">
      <h2>Sales Records</h2>

      <button onClick={() => setShowForm(!showForm)} className="toggle-button">
        {showForm ? 'Cancel' : 'New Sale'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="sales-form">
          <select name="productId" value={form.productId} onChange={handleChange} required>
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} (Stock: {product.stock})
              </option>
            ))}
          </select>

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="client"
            placeholder="Client Name (Optional)"
            value={form.client}
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <div className="sales-total">Total: RWF {total.toLocaleString()}</div>
          <button type="submit">Complete Sale</button>
        </form>
      )}

      <table className="sales-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price (RWF)</th>
            <th>Total (RWF)</th>
            <th>Client</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={index}>
              <td>{sale.id}</td>
              <td>{sale.product}</td>
              <td>{sale.quantity}</td>
              <td>{sale.price.toLocaleString()}</td>
              <td>{sale.total.toLocaleString()}</td>
              <td>{sale.client}</td>
              <td>{sale.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sales;
