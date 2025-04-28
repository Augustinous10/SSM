import React, { useState, useEffect } from 'react';
import './PettyCash.css';

const PettyCashModule = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('expense');
  const [category, setCategory] = useState('supplies');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });
  const [viewMode, setViewMode] = useState('all'); // all, expenses, funding

  // Set current date on component mount
  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    setCurrentDate(formattedDate);
    
    // Initialize date filter with current month
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
    setDateFilter({ from: firstDay, to: lastDay });
    
    // You would typically fetch initial data here from your backend
    // fetchPettyCashData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!description || !amount || isNaN(parseFloat(amount))) {
      alert('Please enter a valid description and amount');
      return;
    }

    const newTransaction = {
      id: Date.now(),
      date: currentDate,
      description,
      category,
      amount: parseFloat(amount),
      type: transactionType,
      timestamp: new Date().toLocaleString()
    };

    // In a real app, you would save this to your backend
    // savePettyCashTransaction(newTransaction).then(() => {
    //   // Update local state after successful save
    // });

    setTransactions([newTransaction, ...transactions]);
    
    // Update balance
    if (transactionType === 'expense') {
      setBalance(prevBalance => prevBalance - parseFloat(amount));
    } else {
      setBalance(prevBalance => prevBalance + parseFloat(amount));
    }
    
    // Reset form
    setDescription('');
    setAmount('');
  };

  const handleDeleteTransaction = (id) => {
    // In a real app, you would delete from your backend
    // deletePettyCashTransaction(id).then(() => {
    //   // Update local state after successful delete
    // });
    
    const transactionToDelete = transactions.find(t => t.id === id);
    
    if (transactionToDelete) {
      // Update balance accordingly
      if (transactionToDelete.type === 'expense') {
        setBalance(prevBalance => prevBalance + transactionToDelete.amount);
      } else {
        setBalance(prevBalance => prevBalance - transactionToDelete.amount);
      }
      
      // Remove transaction
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  // Filter transactions based on search term, date range, and view mode
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const transactionDate = new Date(transaction.date);
    const fromDate = dateFilter.from ? new Date(dateFilter.from) : null;
    const toDate = dateFilter.to ? new Date(dateFilter.to) : null;
    
    const withinDateRange = (!fromDate || transactionDate >= fromDate) && 
                           (!toDate || transactionDate <= toDate);
    
    const matchesType = viewMode === 'all' || 
                       (viewMode === 'expenses' && transaction.type === 'expense') ||
                       (viewMode === 'funding' && transaction.type === 'funding');
    
    return matchesSearch && withinDateRange && matchesType;
  });

  // Calculate summary statistics
  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalFunding = filteredTransactions
    .filter(t => t.type === 'funding')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const filteredBalance = totalFunding - totalExpenses;

  const handleGenerateReport = () => {
    // This would generate a report based on filtered transactions
    // Could download CSV, PDF, or show printable view
    alert('Report generation would be implemented here');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="petty-cash-container">
      <div className="petty-cash-header">
        <h1 className="page-title">Petty Cash Management</h1>
        <div className="action-buttons">
          <button 
            onClick={handleGenerateReport}
            className="btn btn-export"
          >
            Export
          </button>
          <button 
            onClick={handlePrint}
            className="btn btn-print"
          >
            Print
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <h3 className="card-label">Current Balance</h3>
          <p className={`card-value ${balance < 0 ? 'negative' : 'positive'}`}>
            {balance.toLocaleString()} RWF
          </p>
        </div>
        <div className="summary-card">
          <h3 className="card-label">Period Balance</h3>
          <p className={`card-value ${filteredBalance < 0 ? 'negative' : 'positive'}`}>
            {filteredBalance.toLocaleString()} RWF
          </p>
        </div>
        <div className="summary-card">
          <h3 className="card-label">Period Expenses</h3>
          <p className="card-value negative">{totalExpenses.toLocaleString()} RWF</p>
        </div>
        <div className="summary-card">
          <h3 className="card-label">Period Funding</h3>
          <p className="card-value positive">{totalFunding.toLocaleString()} RWF</p>
        </div>
      </div>

      <div className="petty-cash-content">
        {/* Transaction Form */}
        <div className="transaction-form-container">
          <div className="form-panel">
            <h2 className="section-title">New Transaction</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">
                  Transaction Type
                </label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="transactionType"
                      value="expense"
                      checked={transactionType === 'expense'}
                      onChange={() => setTransactionType('expense')}
                    />
                    <span>Expense</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="transactionType"
                      value="funding"
                      checked={transactionType === 'funding'}
                      onChange={() => setTransactionType('funding')}
                    />
                    <span>Funding</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-input"
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                />
              </div>

              {transactionType === 'expense' && (
                <div className="form-group">
                  <label className="form-label">
                    Category
                  </label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="supplies">Office Supplies</option>
                    <option value="transport">Transportation</option>
                    <option value="food">Meals & Refreshments</option>
                    <option value="utilities">Utilities</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">
                  Amount (RWF)
                </label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Amount in RWF"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Transaction description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="form-group">
                <button 
                  type="submit" 
                  className={`btn btn-full ${
                    transactionType === 'expense' 
                      ? 'btn-expense' 
                      : 'btn-funding'
                  }`}
                >
                  {transactionType === 'expense' ? 'Record Expense' : 'Add Funds'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Transactions List */}
        <div className="transactions-container">
          <div className="list-panel">
            <div className="list-header">
              <h2 className="section-title">Transactions</h2>
              
              <div className="filter-controls">
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                <select 
                  className="view-select"
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="expenses">Expenses</option>
                  <option value="funding">Funding</option>
                </select>
              </div>
            </div>
            
            <div className="date-filter">
              <div className="date-input-group">
                <label className="date-label">From Date</label>
                <input
                  type="date"
                  className="date-input"
                  value={dateFilter.from}
                  onChange={(e) => setDateFilter({...dateFilter, from: e.target.value})}
                />
              </div>
              <div className="date-input-group">
                <label className="date-label">To Date</label>
                <input
                  type="date"
                  className="date-input"
                  value={dateFilter.to}
                  onChange={(e) => setDateFilter({...dateFilter, to: e.target.value})}
                />
              </div>
            </div>
            
            {filteredTransactions.length === 0 ? (
              <div className="empty-state">
                No transactions found for the selected criteria
              </div>
            ) : (
              <div className="table-container">
                <table className="transactions-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className={transaction.type === 'expense' ? 'expense-row' : 'funding-row'}>
                        <td>{transaction.date}</td>
                        <td>{transaction.description}</td>
                        <td>{transaction.category || '-'}</td>
                        <td className={transaction.type === 'expense' ? 'amount-expense' : 'amount-funding'}>
                          {transaction.type === 'expense' ? '-' : '+'}{transaction.amount.toLocaleString()} RWF
                        </td>
                        <td>
                          <button 
                            onClick={() => handleDeleteTransaction(transaction.id)}
                            className="btn-delete"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PettyCashModule;