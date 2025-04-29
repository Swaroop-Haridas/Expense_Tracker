import { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import axios from 'axios';

function Home() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  const fetchExpenses = async () => {
    const res = await axios.get('http://localhost:5000/api/expenses');
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async (expense) => {
    await axios.post('http://localhost:5000/api/expenses', expense);
    fetchExpenses();
  };

  const updateExpense = async (expense) => {
    await axios.put(`http://localhost:5000/api/expenses/${editingExpense._id}`, expense);
    setEditingExpense(null);
    fetchExpenses();
  };

  const deleteExpense = async (id) => {
    await axios.delete(`http://localhost:5000/api/expenses/${id}`);
    fetchExpenses();
  };

  const handleSubmit = (expense) => {
    if (editingExpense) {
      updateExpense(expense);
    } else {
      addExpense(expense);
    }
  };

  return (
    <div>
      <ExpenseForm onSubmit={handleSubmit} editingExpense={editingExpense} />
      <ExpenseList expenses={expenses} onEdit={setEditingExpense} onDelete={deleteExpense} />
    </div>
  );
}

export default Home;
