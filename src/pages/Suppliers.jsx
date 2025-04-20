// src/pages/Suppliers.js
import React, { useState } from 'react';
import './Suppliers.css';

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({ name: '', contact: '', address: '', supplies: '' });
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddSupplier = () => {
    if (editIndex !== null) {
      const updatedSuppliers = [...suppliers];
      updatedSuppliers[editIndex] = { ...updatedSuppliers[editIndex], ...newSupplier };
      setSuppliers(updatedSuppliers);
      setEditIndex(null);
    } else {
      const nextId = suppliers.length + 1;
      setSuppliers([...suppliers, { id: nextId, ...newSupplier }]);
    }

    setNewSupplier({ name: '', contact: '', address: '', supplies: '' });
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    setNewSupplier({ ...newSupplier, [e.target.name]: e.target.value });
  };

  const handleEdit = (index) => {
    const supplierToEdit = suppliers[index];
    setNewSupplier(supplierToEdit);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updatedSuppliers = suppliers.filter((_, i) => i !== index);
    setSuppliers(updatedSuppliers);
  };

  return (
    <div className="suppliers-container">
      <h1 className="suppliers-title">📦 Suppliers</h1>

      <button className="add-supplier-btn" onClick={() => {
        setShowForm(!showForm);
        setNewSupplier({ name: '', contact: '', address: '', supplies: '' });
        setEditIndex(null);
      }}>
        {showForm ? 'Cancel' : '+ Add New Supplier'}
      </button>

      {showForm && (
        <div className="supplier-form">
          <input
            type="text"
            name="name"
            placeholder="Supplier Name"
            value={newSupplier.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={newSupplier.contact}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={newSupplier.address}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="supplies"
            placeholder="What They Supply"
            value={newSupplier.supplies}
            onChange={handleInputChange}
          />
          <button className="add-supplier-btn" onClick={handleAddSupplier}>
            {editIndex !== null ? 'Update Supplier' : 'Save Supplier'}
          </button>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <table className="suppliers-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Address</th>
              <th>What They Supply</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, index) => (
              <tr key={supplier.id}>
                <td>{index + 1}</td>
                <td>{supplier.name}</td>
                <td>{supplier.contact}</td>
                <td>{supplier.address}</td>
                <td>{supplier.supplies}</td>
                <td>
                  <button className="action-btn edit" onClick={() => handleEdit(index)}>Edit</button>
                  <button className="action-btn delete" onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Suppliers;
