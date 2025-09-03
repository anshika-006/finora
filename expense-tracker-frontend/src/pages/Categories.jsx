
import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import Button from '../components/Common/Button';
import CategoryModal from '../components/categories/CategoryModal';

import SimpleBarChart from '../components/Common/SimpleBarChart';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api/index';



const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCategories(token);
      setCategories(data);
    } catch (err) {
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSaveCategory = async (categoryToSave) => {
    setError(null);
    try {
      if (categoryToSave.id) {
        const updated = await updateCategory(token, categoryToSave.id, categoryToSave);
        setCategories(categories.map(c => c.id === updated.id ? updated : c));
      } else {
        const created = await createCategory(token, categoryToSave);
        setCategories([...categories, created]);
      }
      handleCloseModal();
    } catch (err) {
      setError('Failed to save category');
    }
  };

  const handleDeleteCategory = async (id) => {
    setError(null);
    try {
      await deleteCategory(token, id);
      setCategories(categories.filter(c => c.id !== id));
    } catch (err) {
      setError('Failed to delete category');
    }
  };

  return (
    <>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {loading ? (
        <div className="text-center py-8">Loading categories...</div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-text-light dark:text-text-dark">Total Category Budget: <span className="font-bold">₹{categories.reduce((sum, c) => sum + (c.budget || 0), 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span></span>
            </div>
            <Button onClick={() => handleOpenModal()}>
              <PlusCircle size={20} className="mr-2" />
              Add Category
            </Button>
          </div>

          <div className="mb-6">
            <SimpleBarChart
              labels={categories.map(c => c.name)}
              data={categories.map(c => c.budget || 0)}
              label="Budget per Category"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase">Name</th>
                  <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase">Budget</th>
                  <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {categories.map(category => (
                  <tr key={category.id}>
                    <td className="p-4 text-text-light dark:text-text-dark">{category.name}</td>
                    <td className="p-4 text-text-light dark:text-text-dark">₹{category.budget?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    <td className="p-4">
                      <button onClick={() => handleOpenModal(category)} className="text-primary-light font-semibold hover:underline">Edit</button>
                      <button onClick={() => handleDeleteCategory(category.id)} className="ml-4 text-red-500 font-semibold hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <CategoryModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCategory}
        category={editingCategory}
      />
    </>
  );
};

export default Categories;
