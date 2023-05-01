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
const {setIncome, getBudgets, addBudget, editBudget, deleteBudget} = require('./controllers/budgets')
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
app.post('/income', setIncome);

app.get('/budgets', getBudgets);
app.post('/budgets', addBudget);
app.put('/budgets/:id', editBudget);
app.delete('/budgets/:id', deleteBudget);

app.get('/transactions', getTransactions);
app.post('/transactions', addTransaction);
app.put('/transactions/:id', editTransaction);
app.delete('/transactions/:id', deleteTransaction);

sequelize.sync()
.then(() => {
    app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`));
})
.catch((error) => console.log(error));