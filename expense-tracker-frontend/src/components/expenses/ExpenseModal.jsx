import React, { useState, useEffect } from 'react';
import Modal from '../Common/Modal';
import Input from '../Common/Input';
import Button from '../Common/Button';

const ExpenseModal = ({ isOpen, onClose, onSave, expense, categories = [] }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    function formatDate(val) {
      if (!val) return '';
      if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
      const d = new Date(val);
      if (isNaN(d)) return '';
      return d.toISOString().split('T')[0];
    }
    if (expense) {
      setName(expense.name);
      setAmount(expense.amount);
      setDate(formatDate(expense.date));
      setCategoryId(expense.categoryId);
    } else {
      setName('');
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      setCategoryId(categories.length > 0 ? categories[0].id : '');
    }
  }, [expense, isOpen, categories]);

  const handleSave = () => {
    onSave({
      id: expense ? expense.id : null,
      name,
      amount: parseFloat(amount),
      date,
      categoryId,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={expense ? 'Edit Expense' : 'Add New Expense'}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expense Name</label>
          <Input
            type="text"
            placeholder="e.g., Coffee, Monthly Rent"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
          <Input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
          <Input
            type="date"
            value={date || ''}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end pt-4 space-x-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Expense</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ExpenseModal;
