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
app.post('/login',  login);

app.get('/budgets',  ()=>console.log('getBudgets'));
app.post('/budgets',  ()=>console.log('addBudget'));
app.put('/budgets/:id',  ()=>console.log('editBudget'));
app.delete('/budgets/:id',  ()=>console.log('deleteBudget'));

app.get('/transactions',  ()=>console.log('getTransactions'));
app.post('/transactions',  ()=>console.log('addTransaction'));
app.put('/transactions/:id',  ()=>console.log('editTransaction'));
app.delete('/transactions/:id',  ()=>console.log('deleteTransaction'));

sequelize.sync()
.then(() => {
    app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`));
})
.catch((error) => console.log(error));