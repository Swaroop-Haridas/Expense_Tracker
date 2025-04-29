function ExpenseList({ expenses, onEdit, onDelete }) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">All Expenses</h2>
        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border border-gray-300 text-left">Amount</th>
                  <th className="py-2 px-4 border border-gray-300 text-left">Category</th>
                  <th className="py-2 px-4 border border-gray-300 text-left">Description</th>
                  <th className="py-2 px-4 border border-gray-300 text-left">Date</th>
                  <th className="py-2 px-4 border border-gray-300 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-2 px-4 border border-gray-300">${expense.amount}</td>
                    <td className="py-2 px-4 border border-gray-300">{expense.category}</td>
                    <td className="py-2 px-4 border border-gray-300">{expense.description}</td>
                    <td className="py-2 px-4 border border-gray-300">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border border-gray-300 space-x-2">
                      <button
                        onClick={() => onEdit(expense)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        aria-label={`Edit expense ${expense._id}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(expense._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label={`Delete expense ${expense._id}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
  
  export default ExpenseList;
  