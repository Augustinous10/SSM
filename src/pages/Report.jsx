import React, { useState, useEffect } from 'react';
import './Report.css';

const SalesReportModule = () => {
  const [salesData, setSalesData] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [salesPeriod, setSalesPeriod] = useState('today');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('all');
  const [loading, setLoading] = useState(true);
  const [reportView, setReportView] = useState('daily'); // daily, weekly, monthly

  // Example categories and payment methods
  const categories = ['Groceries', 'Electronics', 'Clothing', 'Stationery', 'Household'];
  const paymentMethods = ['Cash', 'Mobile Money', 'Card', 'Credit'];

  useEffect(() => {
    // In a real app, this would be an API call to your backend
    // fetchSalesData().then(data => setSalesData(data));
    
    // Using sample data for demonstration
    const generateSampleData = () => {
      const sampleData = [];
      const today = new Date();
      
      // Generate sample sales for the past 30 days
      for (let i = 0; i < 100; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        
        sampleData.push({
          id: i + 1,
          date: date.toISOString().split('T')[0],
          time: `${Math.floor(Math.random() * 12) + 8}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
          customer: `Customer ${Math.floor(Math.random() * 20) + 1}`,
          category: categories[Math.floor(Math.random() * categories.length)],
          items: Math.floor(Math.random() * 5) + 1,
          amount: Math.floor(Math.random() * 50000) + 1000,
          paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
          status: Math.random() > 0.1 ? 'Completed' : 'Refunded'
        });
      }
      
      return sampleData;
    };
    
    const sampleData = generateSampleData();
    setSalesData(sampleData);
    setFilteredSales(sampleData);
    
    // Set initial date range to current month
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
    setDateRange({ from: firstDay, to: lastDay });
    
    setLoading(false);
  }, []);

  useEffect(() => {
    filterSales();
  }, [salesData, dateRange, searchTerm, selectedCategory, selectedPaymentMethod, salesPeriod]);

  const filterSales = () => {
    if (salesData.length === 0) return;
    
    let filtered = [...salesData];
    
    // Filter by date range or preset period
    if (salesPeriod === 'custom' && dateRange.from && dateRange.to) {
      filtered = filtered.filter(sale => {
        const saleDate = new Date(sale.date);
        const fromDate = new Date(dateRange.from);
        const toDate = new Date(dateRange.to);
        return saleDate >= fromDate && saleDate <= toDate;
      });
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      let fromDate = new Date(today);
      
      if (salesPeriod === 'today') {
        // Keep fromDate as today
      } else if (salesPeriod === 'yesterday') {
        fromDate.setDate(fromDate.getDate() - 1);
        today.setDate(today.getDate() - 1);
      } else if (salesPeriod === 'thisWeek') {
        fromDate.setDate(fromDate.getDate() - fromDate.getDay());
      } else if (salesPeriod === 'thisMonth') {
        fromDate.setDate(1);
      } else if (salesPeriod === 'lastMonth') {
        fromDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        today.setDate(0); // Last day of previous month
      }
      
      filtered = filtered.filter(sale => {
        const saleDate = new Date(sale.date);
        return salesPeriod === 'yesterday' 
          ? saleDate.toDateString() === fromDate.toDateString() 
          : saleDate >= fromDate && saleDate <= today;
      });
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(sale => 
        sale.customer.toLowerCase().includes(term) || 
        sale.category.toLowerCase().includes(term) ||
        sale.paymentMethod.toLowerCase().includes(term)
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(sale => sale.category === selectedCategory);
    }
    
    // Filter by payment method
    if (selectedPaymentMethod !== 'all') {
      filtered = filtered.filter(sale => sale.paymentMethod === selectedPaymentMethod);
    }
    
    setFilteredSales(filtered);
  };

  const handleDateRangeChange = (field, value) => {
    setDateRange({ ...dateRange, [field]: value });
    setSalesPeriod('custom');
  };

  const handlePeriodChange = (period) => {
    setSalesPeriod(period);
  };

  const handleReportViewChange = (view) => {
    setReportView(view);
  };

  const handleExportReport = () => {
    alert('Export functionality would be implemented here');
    // This would handle CSV or PDF export
  };

  const handlePrintReport = () => {
    window.print();
  };

  // Calculate summary metrics
  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.amount, 0);
  const totalTransactions = filteredSales.length;
  const averageSale = totalTransactions > 0 ? totalSales / totalTransactions : 0;
  const completedSales = filteredSales.filter(sale => sale.status === 'Completed').length;
  const refundedSales = filteredSales.filter(sale => sale.status === 'Refunded').length;

  // Group sales by category for reporting
  const salesByCategory = categories.map(category => {
    const categorySales = filteredSales.filter(sale => sale.category === category);
    const totalAmount = categorySales.reduce((sum, sale) => sum + sale.amount, 0);
    return {
      category,
      totalAmount,
      count: categorySales.length
    };
  }).sort((a, b) => b.totalAmount - a.totalAmount);

  // Group sales by payment method for reporting
  const salesByPaymentMethod = paymentMethods.map(method => {
    const methodSales = filteredSales.filter(sale => sale.paymentMethod === method);
    const totalAmount = methodSales.reduce((sum, sale) => sum + sale.amount, 0);
    return {
      method,
      totalAmount,
      count: methodSales.length
    };
  }).sort((a, b) => b.totalAmount - a.totalAmount);

  // Group sales by date for trend analysis
  const getDailySales = () => {
    const dailyData = {};
    
    filteredSales.forEach(sale => {
      if (!dailyData[sale.date]) {
        dailyData[sale.date] = {
          date: sale.date,
          totalAmount: 0,
          count: 0
        };
      }
      
      dailyData[sale.date].totalAmount += sale.amount;
      dailyData[sale.date].count += 1;
    });
    
    return Object.values(dailyData).sort((a, b) => new Date(a.date) - new Date(b.date));
  };
  
  const dailySales = getDailySales();

  if (loading) {
    return <div className="loading-indicator">Loading sales data...</div>;
  }

  return (
    <div className="sales-report-container">
      <div className="sales-report-header">
        <h1 className="page-title">Sales Report</h1>
        <div className="action-buttons">
          <button 
            onClick={handleExportReport}
            className="btn btn-export"
          >
            Export
          </button>
          <button 
            onClick={handlePrintReport}
            className="btn btn-print"
          >
            Print
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="filter-panel">
        <div className="filter-section">
          <div className="period-selector">
            <button 
              className={`period-btn ${salesPeriod === 'today' ? 'active' : ''}`}
              onClick={() => handlePeriodChange('today')}
            >
              Today
            </button>
            <button 
              className={`period-btn ${salesPeriod === 'yesterday' ? 'active' : ''}`}
              onClick={() => handlePeriodChange('yesterday')}
            >
              Yesterday
            </button>
            <button 
              className={`period-btn ${salesPeriod === 'thisWeek' ? 'active' : ''}`}
              onClick={() => handlePeriodChange('thisWeek')}
            >
              This Week
            </button>
            <button 
              className={`period-btn ${salesPeriod === 'thisMonth' ? 'active' : ''}`}
              onClick={() => handlePeriodChange('thisMonth')}
            >
              This Month
            </button>
            <button 
              className={`period-btn ${salesPeriod === 'lastMonth' ? 'active' : ''}`}
              onClick={() => handlePeriodChange('lastMonth')}
            >
              Last Month
            </button>
            <button 
              className={`period-btn ${salesPeriod === 'custom' ? 'active' : ''}`}
              onClick={() => handlePeriodChange('custom')}
            >
              Custom
            </button>
          </div>
        </div>

        <div className="filter-section">
          <div className="date-filter">
            <div className="date-input-group">
              <label className="date-label">From Date</label>
              <input
                type="date"
                className="date-input"
                value={dateRange.from}
                onChange={(e) => handleDateRangeChange('from', e.target.value)}
                disabled={salesPeriod !== 'custom'}
              />
            </div>
            <div className="date-input-group">
              <label className="date-label">To Date</label>
              <input
                type="date"
                className="date-input"
                value={dateRange.to}
                onChange={(e) => handleDateRangeChange('to', e.target.value)}
                disabled={salesPeriod !== 'custom'}
              />
            </div>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-row">
            <div className="filter-group">
              <label className="filter-label">Category</label>
              <select
                className="filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Payment Method</label>
              <select
                className="filter-select"
                value={selectedPaymentMethod}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              >
                <option value="all">All Payment Methods</option>
                {paymentMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Search</label>
              <input
                type="text"
                className="search-input"
                placeholder="Search by customer, category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <h3 className="card-label">Total Sales</h3>
          <p className="card-value">{totalSales.toLocaleString()} RWF</p>
        </div>
        <div className="summary-card">
          <h3 className="card-label">Total Transactions</h3>
          <p className="card-value">{totalTransactions}</p>
        </div>
        <div className="summary-card">
          <h3 className="card-label">Average Sale</h3>
          <p className="card-value">{averageSale.toLocaleString()} RWF</p>
        </div>
        <div className="summary-card">
          <h3 className="card-label">Completed / Refunded</h3>
          <p className="card-value">{completedSales} / {refundedSales}</p>
        </div>
      </div>

      {/* Report View Selector */}
      <div className="report-view-selector">
        <button 
          className={`view-btn ${reportView === 'daily' ? 'active' : ''}`}
          onClick={() => handleReportViewChange('daily')}
        >
          Daily Sales
        </button>
        <button 
          className={`view-btn ${reportView === 'category' ? 'active' : ''}`}
          onClick={() => handleReportViewChange('category')}
        >
          By Category
        </button>
        <button 
          className={`view-btn ${reportView === 'payment' ? 'active' : ''}`}
          onClick={() => handleReportViewChange('payment')}
        >
          By Payment Method
        </button>
        <button 
          className={`view-btn ${reportView === 'transactions' ? 'active' : ''}`}
          onClick={() => handleReportViewChange('transactions')}
        >
          Transactions
        </button>
      </div>

      {/* Report Content */}
      <div className="report-content">
        {reportView === 'daily' && (
          <div className="daily-sales-report">
            <h2 className="section-title">Daily Sales Trend</h2>
            {dailySales.length === 0 ? (
              <div className="empty-state">No sales data available for the selected period</div>
            ) : (
              <div className="table-container">
                <table className="sales-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Transactions</th>
                      <th>Total Sales</th>
                      <th>Average Sale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailySales.map(day => (
                      <tr key={day.date}>
                        <td>{new Date(day.date).toLocaleDateString()}</td>
                        <td>{day.count}</td>
                        <td>{day.totalAmount.toLocaleString()} RWF</td>
                        <td>{(day.totalAmount / day.count).toLocaleString()} RWF</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {reportView === 'category' && (
          <div className="category-sales-report">
            <h2 className="section-title">Sales by Category</h2>
            <div className="table-container">
              <table className="sales-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Transactions</th>
                    <th>Total Sales</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {salesByCategory.map(category => (
                    <tr key={category.category}>
                      <td>{category.category}</td>
                      <td>{category.count}</td>
                      <td>{category.totalAmount.toLocaleString()} RWF</td>
                      <td>{totalSales > 0 ? ((category.totalAmount / totalSales) * 100).toFixed(1) : 0}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reportView === 'payment' && (
          <div className="payment-sales-report">
            <h2 className="section-title">Sales by Payment Method</h2>
            <div className="table-container">
              <table className="sales-table">
                <thead>
                  <tr>
                    <th>Payment Method</th>
                    <th>Transactions</th>
                    <th>Total Sales</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {salesByPaymentMethod.map(payment => (
                    <tr key={payment.method}>
                      <td>{payment.method}</td>
                      <td>{payment.count}</td>
                      <td>{payment.totalAmount.toLocaleString()} RWF</td>
                      <td>{totalSales > 0 ? ((payment.totalAmount / totalSales) * 100).toFixed(1) : 0}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reportView === 'transactions' && (
          <div className="transactions-report">
            <h2 className="section-title">Transaction Details</h2>
            {filteredSales.length === 0 ? (
              <div className="empty-state">No transactions found for the selected filters</div>
            ) : (
              <div className="table-container">
                <table className="sales-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Customer</th>
                      <th>Category</th>
                      <th>Items</th>
                      <th>Amount</th>
                      <th>Payment</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSales.map(sale => (
                      <tr key={sale.id} className={sale.status === 'Refunded' ? 'refunded-row' : ''}>
                        <td>{new Date(sale.date).toLocaleDateString()}</td>
                        <td>{sale.time}</td>
                        <td>{sale.customer}</td>
                        <td>{sale.category}</td>
                        <td>{sale.items}</td>
                        <td>{sale.amount.toLocaleString()} RWF</td>
                        <td>{sale.paymentMethod}</td>
                        <td>
                          <span className={`status-badge ${sale.status.toLowerCase()}`}>
                            {sale.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesReportModule;