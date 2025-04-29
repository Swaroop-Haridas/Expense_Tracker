import { useState, useEffect } from 'react';
import ExpenseChart from '../components/ExpenseChart';
import axios from 'axios';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const res = await axios.get('http://localhost:5000/api/expenses');
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-6">Expense Charts</h2>
      <ExpenseChart expenses={expenses} />
    </div>
  );
}

export default Dashboard;
