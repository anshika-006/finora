
import React, { useEffect, useState } from 'react';
import MonthlySpendingChart from '../components/Dashboard/MonthlySpendingChart';
import WeeklySpendingChart from '../components/Dashboard/WeeklySpendingChart';
import CategoryBreakdownChart from '../components/Dashboard/CategoryBreakdownChart';
import MonthlyIncomeChart from '../components/Dashboard/MonthlyIncomeChart';
import WeeklyIncomeChart from '../components/Dashboard/WeeklyIncomeChart';
import IncomeBreakdownChart from '../components/Dashboard/IncomeBreakdownChart';
import CombinedMonthlyChart from '../components/Dashboard/CombinedMonthlyChart';
import CombinedYearlyChart from '../components/Dashboard/CombinedYearlyChart';
import { getExpenseSummary, getExpenseTrends, getExpenses, getCategories, getIncomes } from '../api/index';

const Dashboard = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [monthlySpending, setMonthlySpending] = useState(0);
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);
  const [monthlyChartData, setMonthlyChartData] = useState({ labels: [], data: [] });
  const [weeklyChartData, setWeeklyChartData] = useState({ labels: [], data: [] });
  const [totalIncome, setTotalIncome] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [incomeBreakdown, setIncomeBreakdown] = useState([]);
  const [monthlyIncomeChart, setMonthlyIncomeChart] = useState({ labels: [], data: [] });
  const [weeklyIncomeChart, setWeeklyIncomeChart] = useState({ labels: [], data: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [expenses, incomes, categories] = await Promise.all([
        getExpenses(token),
        getIncomes(token),
        getCategories(token)
      ]);

      const now = new Date();
      const thisMonth = now.getMonth();
      const thisYear = now.getFullYear();
      setTotalExpenses(expenses.reduce((sum, exp) => sum + exp.amount, 0));
      setMonthlySpending(expenses.filter(exp => {
        const d = new Date(exp.date);
        return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
      }).reduce((sum, exp) => sum + exp.amount, 0));
      const monthLabels = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      const monthlyTotals = Array(12).fill(0);
      expenses.forEach(exp => {
        const d = new Date(exp.date);
        if (d.getFullYear() === thisYear) {
          monthlyTotals[d.getMonth()] += exp.amount;
        }
      });
      setMonthlyChartData({ labels: monthLabels, data: monthlyTotals });
      const getWeekOfMonth = (date) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return Math.ceil((date.getDate() + firstDay) / 7);
      };
      const weeksInMonth = 5;
      const weekLabels = Array.from({ length: weeksInMonth }, (_, i) => `Week ${i + 1}`);
      const weeklyTotals = Array(weeksInMonth).fill(0);
      expenses.forEach(exp => {
        const d = new Date(exp.date);
        if (d.getMonth() === thisMonth && d.getFullYear() === thisYear) {
          const week = getWeekOfMonth(d) - 1;
          if (week >= 0 && week < weeksInMonth) {
            weeklyTotals[week] += exp.amount;
          }
        }
      });
      setWeeklyChartData({ labels: weekLabels, data: weeklyTotals });
      const catMap = {};
      expenses.forEach(exp => {
        const d = new Date(exp.date);
        if (d.getMonth() === thisMonth && d.getFullYear() === thisYear) {
          catMap[exp.categoryId] = (catMap[exp.categoryId] || 0) + exp.amount;
        }
      });
      const breakdown = Object.entries(catMap).map(([catId, amt]) => {
        const cat = categories.find(c => c.id === Number(catId));
        return { name: cat ? cat.name : 'Unknown', amount: amt };
      });
      setCategoryBreakdown(breakdown);

      setTotalIncome(incomes.reduce((sum, inc) => sum + inc.amount, 0));
      setMonthlyIncome(incomes.filter(inc => {
        const d = new Date(inc.date);
        return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
      }).reduce((sum, inc) => sum + inc.amount, 0));
      const monthlyIncomeTotals = Array(12).fill(0);
      incomes.forEach(inc => {
        const d = new Date(inc.date);
        if (d.getFullYear() === thisYear) {
          monthlyIncomeTotals[d.getMonth()] += inc.amount;
        }
      });
      setMonthlyIncomeChart({ labels: monthLabels, data: monthlyIncomeTotals });
      const weeklyIncomeTotals = Array(weeksInMonth).fill(0);
      incomes.forEach(inc => {
        const d = new Date(inc.date);
        if (d.getMonth() === thisMonth && d.getFullYear() === thisYear) {
          const week = getWeekOfMonth(d) - 1;
          if (week >= 0 && week < weeksInMonth) {
            weeklyIncomeTotals[week] += inc.amount;
          }
        }
      });
      setWeeklyIncomeChart({ labels: weekLabels, data: weeklyIncomeTotals });
      const sourceMap = {};
      incomes.forEach(inc => {
        const d = new Date(inc.date);
        if (d.getMonth() === thisMonth && d.getFullYear() === thisYear) {
          sourceMap[inc.source] = (sourceMap[inc.source] || 0) + inc.amount;
        }
      });
      const incomeBreak = Object.entries(sourceMap).map(([name, amount]) => ({ name, amount }));
      setIncomeBreakdown(incomeBreak);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4 tracking-wide border-b border-gray-700 pb-2">Income & Expense Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
            <h3 className="font-semibold text-text-light dark:text-text-dark mb-2">Monthly Comparison</h3>
            <div className="h-56">
              <CombinedMonthlyChart
                expenseData={monthlyChartData.data}
                incomeData={monthlyIncomeChart.data}
                labels={monthlyChartData.labels}
              />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
            <h3 className="font-semibold text-text-light dark:text-text-dark mb-2">Yearly Comparison</h3>
            <div className="h-56">
              <CombinedYearlyChart
                expenseData={monthlyChartData.data}
                incomeData={monthlyIncomeChart.data}
                labels={monthlyChartData.labels}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4 tracking-wide border-b border-gray-700 pb-2">Expense Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col ml-4">
            <h3 className="font-semibold text-text-light dark:text-text-dark">Total Expenses</h3>
            <p className="text-3xl font-bold mt-2 text-text-light dark:text-text-dark">₹{totalExpenses.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
            <div className="h-40 mt-4 flex-1">
              <MonthlySpendingChart monthlyData={monthlyChartData} />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col mr-4">
            <h3 className="font-semibold text-text-light dark:text-text-dark">Monthly Spending</h3>
            <p className="text-3xl font-bold mt-2 text-text-light dark:text-text-dark">₹{monthlySpending.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
            <div className="h-40 mt-4 flex-1">
              <WeeklySpendingChart weeklyData={weeklyChartData} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4 tracking-wide border-b border-gray-700 pb-2">Income Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col ml-4">
            <h3 className="font-semibold text-text-light dark:text-text-dark">Total Income</h3>
            <p className="text-3xl font-bold mt-2 text-green-600 dark:text-green-400">₹{totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
            <div className="h-40 mt-4 flex-1">
              <MonthlyIncomeChart monthlyData={monthlyIncomeChart} />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col mr-4">
            <h3 className="font-semibold text-text-light dark:text-text-dark">Monthly Income</h3>
            <p className="text-3xl font-bold mt-2 text-green-600 dark:text-green-400">₹{monthlyIncome.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
            <div className="h-40 mt-4 flex-1">
              <WeeklyIncomeChart weeklyData={weeklyIncomeChart} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-4 tracking-wide border-b border-gray-700 pb-2">Category Analytics - Monthly</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col ml-4">
            <h3 className="font-semibold text-text-light dark:text-text-dark">Category Breakdown (Expenses)</h3>
            <div className="h-48 mt-4 flex-1">
              <CategoryBreakdownChart breakdown={categoryBreakdown} />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col mr-4">
            <h3 className="font-semibold text-text-light dark:text-text-dark">Income Breakdown (Sources)</h3>
            <div className="h-48 mt-4 flex-1">
              <IncomeBreakdownChart breakdown={incomeBreakdown} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
      </div>
    </div>
  );
};

export default Dashboard;
