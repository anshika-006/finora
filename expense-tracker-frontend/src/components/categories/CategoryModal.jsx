import React, { useState, useEffect } from 'react';
import Button from '../Common/Button';
import Input from '../Common/Input';

const CategoryModal = ({ isOpen, onClose, onSave, category }) => {
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (category) {
        setName(category.name);
        setBudget(category.budget?.toString() || '');
      } else {
        setName('');
        setBudget('');
      }
    }
  }, [category, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...category, name, budget: parseFloat(budget) || 0 });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-text-light dark:text-text-dark">
          {category ? 'Edit Category' : 'Add New Category'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category Name</label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Groceries"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monthly Budget</label>
            <Input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g., 500"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {category ? 'Save Changes' : 'Add Category'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
