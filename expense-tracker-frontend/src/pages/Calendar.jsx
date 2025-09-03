import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { getExpenses, getIncomes } from '../api';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [financialData, setFinancialData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const [expenses, incomes] = await Promise.all([
          getExpenses(token),
          getIncomes(token)
        ]);
        const data = {};
        expenses.forEach(exp => {
          const dateKey = (new Date(exp.date)).toISOString().split('T')[0];
          if (!data[dateKey]) data[dateKey] = [];
          data[dateKey].push({
            type: 'expense',
            amount: exp.amount,
            source: exp.name || exp.description || '',
            category: exp.category?.name || ''
          });
        });
        incomes.forEach(inc => {
          const dateKey = (new Date(inc.date)).toISOString().split('T')[0];
          if (!data[dateKey]) data[dateKey] = [];
          data[dateKey].push({
            type: 'income',
            amount: inc.amount,
            source: inc.source || '',
            category: inc.category || ''
          });
        });
        setFinancialData(data);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();
    const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 p-1"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(year, month, day);
      const dayData = financialData[dateKey] || [];
      const isToday = isCurrentMonth && day === today.getDate();
      
      const totalIncome = dayData
        .filter(item => item.type === 'income')
        .reduce((sum, item) => sum + item.amount, 0);
      
      const totalExpense = dayData
        .filter(item => item.type === 'expense')
        .reduce((sum, item) => sum + item.amount, 0);

      days.push(
        <div
          key={day}
          className={`h-20 p-1 border border-gray-700 rounded-lg transition-all hover:border-gray-600 ${
            isToday ? 'bg-blue-900/30 border-blue-500' : 'bg-gray-800/50'
          }`}
        >
          <div className={`text-sm font-medium mb-1 ${
            isToday ? 'text-blue-400' : 'text-gray-300'
          }`}>
            {day}
          </div>
          
          <div className="space-y-0.5">
            {totalIncome > 0 && (
              <div className="flex items-center text-xs text-green-400">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                <span className="truncate">₹{totalIncome.toLocaleString('en-IN')}</span>
              </div>
            )}
            
            {totalExpense > 0 && (
              <div className="flex items-center text-xs text-red-400">
                <ArrowDownLeft className="w-3 h-3 mr-1" />
                <span className="truncate">₹{totalExpense.toLocaleString('en-IN')}</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const getMonthSummary = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    let totalIncome = 0;
    let totalExpense = 0;
    
    Object.entries(financialData).forEach(([dateKey, entries]) => {
      const entryDate = new Date(dateKey);
      if (entryDate.getFullYear() === year && entryDate.getMonth() === month) {
        entries.forEach(entry => {
          if (entry.type === 'income') {
            totalIncome += entry.amount;
          } else if (entry.type === 'expense') {
            totalExpense += entry.amount;
          }
        });
      }
    });
    
    return { totalIncome, totalExpense };
  };

  const { totalIncome, totalExpense } = getMonthSummary();

  if (loading) return <div className="p-6 text-white">Loading...</div>;
  if (error) return <div className="p-6 text-red-400">{error}</div>;

  return (
    <div className="p-6 pt-0 bg-gray-900 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Monthly Income</p>
              <p className="text-green-400 text-xl font-bold">{formatCurrency(totalIncome)}</p>
            </div>
            <ArrowUpRight className="w-8 h-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Monthly Expenses</p>
              <p className="text-red-400 text-xl font-bold">{formatCurrency(totalExpense)}</p>
            </div>
            <ArrowDownLeft className="w-8 h-8 text-red-400" />
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Net Balance</p>
              <p className={`text-xl font-bold ${
                totalIncome - totalExpense >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {formatCurrency(totalIncome - totalExpense)}
              </p>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              totalIncome - totalExpense >= 0 ? 'bg-green-400/20' : 'bg-red-400/20'
            }`}>
              {totalIncome - totalExpense >= 0 ? 
                <ArrowUpRight className="w-5 h-5 text-green-400" /> :
                <ArrowDownLeft className="w-5 h-5 text-red-400" />
              }
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays.map(day => (
            <div key={day} className="text-center text-gray-400 font-medium py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {renderCalendarDays()}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <ArrowUpRight className="w-4 h-4 text-green-400" />
          <span className="text-gray-400">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <ArrowDownLeft className="w-4 h-4 text-red-400" />
          <span className="text-gray-400">Expense</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;