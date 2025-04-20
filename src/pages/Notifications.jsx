// src/pages/Notifications.js
import React, { useEffect, useState } from 'react';
import './Notifications.css';

// Dummy data — in real app, you'd pull this from global state or backend
const dummyProducts = [
  { name: 'Samsung Galaxy A14', stock: 3 },
  { name: 'iPhone 12 Pro', stock: 7 },
  { name: 'Tecno Spark 10', stock: 15 },
];

const dummyDebts = [
  { client: 'Eric Nshimi', amount: 120000, phone: '0788123456', date: '2025-04-01' },
  { client: 'Mugisha Jean', amount: 200000, phone: '0788567890', date: '2025-04-15' },
];

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const today = new Date();
    const notifs = [];

    // Low stock check
    dummyProducts.forEach((product) => {
      if (product.stock < 10) {
        notifs.push({
          type: 'Stock',
          message: `⚠️ "${product.name}" is low in stock (${product.stock} left).`,
        });
      }
    });

    // Debt reminders
    dummyDebts.forEach((debt) => {
      const dueDate = new Date(debt.date);
      const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
      if (daysLeft <= 3) {
        notifs.push({
          type: 'Debt',
          message: `💰 "${debt.client}" has an unpaid debt of RWF ${debt.amount.toLocaleString()} due in ${daysLeft} day(s).`,
        });
      }
    });

    // Add more logic here (e.g. unpaid purchases, expiring items, etc.)

    setNotifications(notifs);
  }, []);

  return (
    <div className="notifications-container">
      <h1 className="notifications-title">🔔 Notifications</h1>
      {notifications.length === 0 ? (
        <p className="no-notifs">✅ All systems are good. No notifications!</p>
      ) : (
        <ul className="notif-list">
          {notifications.map((notif, index) => (
            <li key={index} className={`notif-item notif-${notif.type.toLowerCase()}`}>
              {notif.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notifications;
