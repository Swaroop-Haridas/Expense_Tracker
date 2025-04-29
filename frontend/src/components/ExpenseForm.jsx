import { useState, useEffect } from 'react';

function ExpenseForm({ onSubmit, editingExpense }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDescription(editingExpense.description);
      setDate(editingExpense.date.slice(0, 10));
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category || !description || !date) {
      alert('All fields are required!');
      return;
    }
    onSubmit({ amount, category, description, date });
    setAmount('');
    setCategory('');
    setDescription('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mb-8 p-4">
      <h2 className="text-3xl font-semibold text-gray-800 text-center">{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h2>
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          id="amount"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0.01"
          step="0.01"
          className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <input
          id="category"
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <input
          id="description"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full mt-2 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-lg transition duration-200 transform hover:scale-105"
      >
        {editingExpense ? 'Update Expense' : 'Add Expense'}
      </button>
    </form>
  );
}

export default ExpenseForm;
