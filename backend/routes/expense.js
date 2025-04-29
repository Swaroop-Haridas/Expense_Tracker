const authMiddleware = require('../middleware/authMiddleware');
router.use(authMiddleware);
const newExpense = new Expense({ ...req.body, user: req.user });
await newExpense.save();
res.status(201).json(newExpense);
const expenses = await Expense.find({ user: req.user });
res.json(expenses);