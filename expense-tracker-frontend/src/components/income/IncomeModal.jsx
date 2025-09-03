import React, { useState, useEffect } from 'react';
import Input from '../Common/Input';
import Button from '../Common/Button';

const IncomeModal = ({ isOpen, onClose, onSave, income }) => {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (income) {
      setAmount(income.amount);
      setSource(income.source);
      setDate(income.date ? income.date.slice(0, 10) : '');
    } else {
      setAmount('');
      setSource('');
      setDate('');
    }
  }, [income, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: income?.id,
      amount: Number(amount),
      source,
      date,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-text-light dark:text-text-dark">
          {income ? 'Edit Income' : 'Add New Income'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
            <Input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="e.g., 10000"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Source</label>
            <Input
              type="text"
              value={source}
              onChange={e => setSource(e.target.value)}
              placeholder="e.g., Salary, Freelance"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
            <Input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit">{income ? 'Save Changes' : 'Add Income'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncomeModal;
