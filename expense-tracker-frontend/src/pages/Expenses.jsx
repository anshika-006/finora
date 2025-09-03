
import React, { useState, useEffect } from 'react';
import Button from '../components/Common/Button';
import ExpenseModal from '../components/expenses/ExpenseModal';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

import SimpleBarChart from '../components/Common/SimpleBarChart';
import { getExpenses, createExpense, updateExpense, deleteExpense, getCategories } from '../api/index';


const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [expenseData, categoryData] = await Promise.all([
        getExpenses(token),
        getCategories(token)
      ]);
      setExpenses(expenseData);
      setCategories(categoryData);
    } catch (err) {
      setError('Failed to load expenses or categories');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (expense = null) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingExpense(null);
  };

  const handleSaveExpense = async (expenseData) => {
    setError(null);
    try {
      let saved;
      if (expenseData.id) {
        saved = await updateExpense(token, expenseData.id, expenseData);
        setExpenses(expenses.map(exp => (exp.id === saved.id ? saved : exp)));
      } else {
        saved = await createExpense(token, expenseData);
        setExpenses([saved, ...expenses]);
      }
      handleCloseModal();
    } catch (err) {
      setError('Failed to save expense');
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    setError(null);
    try {
      await deleteExpense(token, expenseId);
      setExpenses(expenses.filter(exp => exp.id !== expenseId));
    } catch (err) {
      setError('Failed to delete expense');
    }
  };


  const getCategoryName = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat ? cat.name : '';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {loading ? (
        <div className="text-center py-8">Loading expenses...</div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-text-light dark:text-text-dark">Total Expense: <span className="font-bold">₹{expenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span></span>
            </div>
            <Button onClick={() => handleOpenModal()}>
              <PlusCircle size={20} className="mr-2" />
              Add Expense
            </Button>
          </div>

          <div className="mb-6">
            <SimpleBarChart
              labels={categories.map(c => c.name)}
              data={categories.map(c => expenses.filter(e => e.categoryId === c.id).reduce((sum, e) => sum + e.amount, 0))}
              label="Total Spent per Category"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="p-4 font-semibold">Name</th>
                    <th className="p-4 font-semibold">Amount</th>
                    <th className="p-4 font-semibold">Date</th>
                    <th className="p-4 font-semibold">Category</th>
                    <th className="p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {expenses.map((expense) => (
                    <tr key={expense.id}>
                      <td className="p-4">{expense.description}</td>
                      <td className="p-4">₹{expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      <td className="p-4">{formatDate(expense.date)}</td>
                      <td className="p-4">{getCategoryName(expense.categoryId)}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-4">
                          <button onClick={() => handleOpenModal(expense)} className="text-blue-500 hover:text-blue-700">
                            <Edit size={18} />
                          </button>
                          <button onClick={() => handleDeleteExpense(expense.id)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <ExpenseModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleSaveExpense}
            expense={editingExpense}
            categories={categories}
          />
        </>
      )}
    </>
  );
};

export default Expenses;
