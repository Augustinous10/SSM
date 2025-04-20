// src/pages/Clients.js
import React, { useState } from 'react';
import './Clients.css';

function Clients() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    name: '',
    phone: '',
    location: '',
  });

  const handleChange = (e) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  const handleAddClient = () => {
    if (!newClient.name || !newClient.phone) return;

    const newRecord = {
      id: clients.length + 1,
      ...newClient,
      date: new Date().toLocaleDateString(),
    };

    setClients([...clients, newRecord]);
    setNewClient({ name: '', phone: '', location: '' });
  };

  return (
    <div className="clients-container">
      <h1 className="clients-title">👥 Clients</h1>

      <div className="client-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={newClient.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={newClient.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location (Optional)"
          value={newClient.location}
          onChange={handleChange}
        />
        <button className="add-client-btn" onClick={handleAddClient}>
          Add Client
        </button>
      </div>

      <table className="clients-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Registered On</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={client.id}>
              <td>{index + 1}</td>
              <td>{client.name}</td>
              <td>{client.phone}</td>
              <td>{client.location || '—'}</td>
              <td>{client.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clients;
