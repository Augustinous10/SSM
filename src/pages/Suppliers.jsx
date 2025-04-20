// src/pages/Suppliers.js
import React, { useState } from 'react';
import './Suppliers.css';

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    phone: '',
    company: '',
    items: '',
  });

  const handleChange = (e) => {
    setNewSupplier({ ...newSupplier, [e.target.name]: e.target.value });
  };

  const handleAddSupplier = () => {
    if (!newSupplier.name || !newSupplier.phone) return;

    const supplierToAdd = {
      id: suppliers.length + 1,
      ...newSupplier,
      date: new Date().toLocaleDateString(),
    };

    setSuppliers([...suppliers, supplierToAdd]);
    setNewSupplier({ name: '', phone: '', company: '', items: '' });
  };

  return (
    <div className="suppliers-container">
      <h1 className="suppliers-title">📦 Suppliers</h1>

      <div className="supplier-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={newSupplier.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={newSupplier.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={newSupplier.company}
          onChange={handleChange}
        />
        <input
          type="text"
          name="items"
          placeholder="Supplied Items (comma-separated)"
          value={newSupplier.items}
          onChange={handleChange}
        />
        <button className="add-supplier-btn" onClick={handleAddSupplier}>
          Add Supplier
        </button>
      </div>

      <table className="suppliers-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Items Supplied</th>
            <th>Registered On</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier, index) => (
            <tr key={supplier.id}>
              <td>{index + 1}</td>
              <td>{supplier.name}</td>
              <td>{supplier.phone}</td>
              <td>{supplier.company || '—'}</td>
              <td>{supplier.items || '—'}</td>
              <td>{supplier.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Suppliers;
