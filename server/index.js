require('dotenv').config();

const express = require('express');
const cors = require('cors');

const {SERVER_PORT} = process.env;

const {sequelize} = require('./util/database');
const {User} = require('./models/user')
const {Budget} = require('./models/budget')
const {SubBudget} = require('./models/sub_budget')
const {Transaction} = require('./models/transaction');

const { login, register } = require('./controllers/auth');
const {getIncome, setIncome, getBudgets, getSubbudgets, addBudget, editBudget, deleteBudget} = require('./controllers/budgets')
const {getTransactions, addTransaction, editTransaction, deleteTransaction} = require('./controllers/transactions')

const app = express();

app.use(express.json());
app.use(cors());

User.hasMany(Budget);
Budget.belongsTo(User);
Budget.hasMany(SubBudget);
SubBudget.belongsTo(Budget);
Budget.hasMany(Transaction);
SubBudget.hasMany(Transaction);

app.post('/register', register);
app.post('/login', login);
app.put('/income', setIncome);
app.post('/income', getIncome);

app.get('/budgets/:userId', getBudgets);
app.get('/subbudgets/:budgetId', getSubbudgets);
app.post('/budgets', addBudget);
app.put('/budgets', editBudget);
app.delete('/budgets', deleteBudget);

app.get('/transactions', getTransactions);
app.post('/transactions', addTransaction);
app.put('/transactions', editTransaction);
app.delete('/transactions', deleteTransaction);

sequelize.sync()
.then(() => {
    app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`));
})
.catch((error) => console.log(error));