import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

function ExpenseChart({ expenses }) {
  // Group by category for PieChart
  const categoryData = [];
  const categoryMap = {};

  expenses.forEach((expense) => {
    if (categoryMap[expense.category]) {
      categoryMap[expense.category] += expense.amount;
    } else {
      categoryMap[expense.category] = expense.amount;
    }
  });

  for (const category in categoryMap) {
    categoryData.push({ name: category, value: categoryMap[category] });
  }

  // Group by month for BarChart
  const monthlyData = {};
  expenses.forEach((expense) => {
    const month = new Date(expense.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    if (monthlyData[month]) {
      monthlyData[month] += expense.amount;
    } else {
      monthlyData[month] = expense.amount;
    }
  });

  const barData = Object.keys(monthlyData).map((month) => ({
    month,
    amount: monthlyData[month],
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BD4', '#FF6699', '#33CC99'];

  return (
    <div>
      <h2>Expense Charts</h2>

      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {/* Pie Chart */}
        <PieChart width={400} height={400}>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={140}
            label
          >
            {categoryData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* Bar Chart */}
        <BarChart width={600} height={400} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}

export default ExpenseChart;

