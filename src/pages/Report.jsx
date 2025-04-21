import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import './Report.css';

function Report() {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedSales = JSON.parse(localStorage.getItem('salesData')) || [];
    setSales(storedSales);
    setFilteredSales(storedSales);
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredSales(sales);
      return;
    }

    const now = new Date();
    let fromDate;

    switch (filter) {
      case 'today':
        fromDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'week':
        fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 7);
        break;
      case 'month':
        fromDate = new Date();
        fromDate.setMonth(fromDate.getMonth() - 1);
        break;
      case '90days':
        fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 90);
        break;
      case 'year':
        fromDate = new Date();
        fromDate.setFullYear(fromDate.getFullYear() - 1);
        break;
      default:
        return;
    }

    const filtered = sales.filter(sale => {
      const saleDate = new Date(sale.date || sale.timestamp);
      return saleDate >= fromDate;
    });

    setFilteredSales(filtered);
  }, [filter, sales]);

  const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
  const totalSales = filteredSales.length;

  const salesByProduct = filteredSales.reduce((acc, sale) => {
    acc[sale.product] = (acc[sale.product] || 0) + sale.quantity;
    return acc;
  }, {});

  const topProducts = Object.entries(salesByProduct).sort((a, b) => b[1] - a[1]);

  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      ["Product,Quantity,Total,Date", ...filteredSales.map(s => `${s.product},${s.quantity},${s.total},${s.date}`)].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sales_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = () => {
    const blob = new Blob([JSON.stringify(filteredSales, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "sales_report.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Sales Report", 14, 20);

    doc.setFontSize(12);
    doc.text(`Total Sales: ${totalSales}`, 14, 30);
    doc.text(`Total Revenue: RWF ${totalRevenue.toLocaleString()}`, 14, 37);

    doc.autoTable({
      head: [["Product", "Quantity", "Total", "Date"]],
      body: filteredSales.map(s => [
        s.product,
        s.quantity,
        `RWF ${s.total.toLocaleString()}`,
        s.date || new Date(s.timestamp).toLocaleDateString()
      ]),
      startY: 45,
      theme: 'striped',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 123, 255] }
    });

    doc.save("sales_report.pdf");
  };

  const exportToExcel = () => {
    const worksheetData = filteredSales.map(sale => ({
      Product: sale.product,
      Quantity: sale.quantity,
      Total: sale.total,
      Date: sale.date || new Date(sale.timestamp).toLocaleDateString()
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SalesReport");

    XLSX.writeFile(workbook, "sales_report.xlsx");
  };

  return (
    <div className="report-container">
      <h2>Sales Report</h2>

      <div className="filter-options">
        <label>Filter by:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last Month</option>
          <option value="90days">Last 90 Days</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <div className="summary-cards">
        <div className="card">
          <h3>Total Sales</h3>
          <p>{totalSales}</p>
        </div>
        <div className="card">
          <h3>Total Revenue</h3>
          <p>RWF {totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      <h3>Top Selling Products</h3>
      <table className="report-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Total Quantity Sold</th>
          </tr>
        </thead>
        <tbody>
          {topProducts.map(([product, quantity], index) => (
            <tr key={index}>
              <td>{product}</td>
              <td>{quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="export-buttons">
        <button onClick={exportToCSV}>Export as CSV</button>
        <button onClick={exportToJSON}>Export as JSON</button>
        <button onClick={exportToPDF}>Export as PDF</button>
        <button onClick={exportToExcel}>Export as Excel</button>
      </div>
    </div>
  );
}

export default Report;
