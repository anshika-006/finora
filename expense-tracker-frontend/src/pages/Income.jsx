
import React, { useEffect, useState } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import SimpleBarChart from '../components/Common/SimpleBarChart';
import Button from '../components/Common/Button';
import IncomeModal from '../components/income/IncomeModal';

import { getIncomes, createIncome, updateIncome, deleteIncome } from '../api';

const IncomePage = () => {
  const [incomes, setIncomes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getIncomes(token);
      setIncomes(data);
    } catch (err) {
      setError('Failed to load incomes');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (income = null) => {
    setEditingIncome(income);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingIncome(null);
  };

  const handleSaveIncome = async (incomeData) => {
    setError(null);
    try {
      let saved;
      if (incomeData.id) {
        saved = await updateIncome(token, incomeData.id, incomeData);
        setIncomes(incomes.map(i => (i.id === saved.id ? saved : i)));
      } else {
        saved = await createIncome(token, incomeData);
        setIncomes([saved, ...incomes]);
      }
      handleCloseModal();
    } catch (err) {
      setError('Failed to save income');
    }
  };

  const handleDeleteIncome = async (incomeId) => {
    setError(null);
    try {
      await deleteIncome(token, incomeId);
      setIncomes(incomes.filter(i => i.id !== incomeId));
    } catch (err) {
      setError('Failed to delete income');
    }
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

  const sources = Array.from(new Set(incomes.map(i => i.source)));
  const incomeBySource = sources.map(src => incomes.filter(i => i.source === src).reduce((sum, i) => sum + i.amount, 0));

  return (
    <>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {loading ? (
        <div className="text-center py-8">Loading incomes...</div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-text-light dark:text-text-dark">Total Income: <span className="font-bold">₹{incomes.reduce((sum, i) => sum + i.amount, 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span></span>
            </div>
            <Button onClick={() => handleOpenModal()}>
              <PlusCircle size={20} className="mr-2" />
              Add Income
            </Button>
          </div>

          <div className="mb-6">
            <SimpleBarChart
              labels={sources}
              data={incomeBySource}
              label="Total Income per Source"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="p-4 font-semibold">Source</th>
                    <th className="p-4 font-semibold">Amount</th>
                    <th className="p-4 font-semibold">Date</th>
                    <th className="p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {incomes.map((income) => (
                    <tr key={income.id}>
                      <td className="p-4">{income.source}</td>
                      <td className="p-4">₹{income.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      <td className="p-4">{formatDate(income.date)}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-4">
                          <button onClick={() => handleOpenModal(income)} className="text-blue-500 hover:text-blue-700">
                            <Edit size={18} />
                          </button>
                          <button onClick={() => handleDeleteIncome(income.id)} className="text-red-500 hover:text-red-700">
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

          <IncomeModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleSaveIncome}
            income={editingIncome}
          />
        </>
      )}
    </>
  );
};

export default IncomePage;
