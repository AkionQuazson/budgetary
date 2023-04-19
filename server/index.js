require('dotenv').config();

const express = require('express');
const cors = require('cors');

const {SERVER_PORT} = process.env;


const app = express();

app.use(express.json());
app.use(cors());

app.get('/register', ()=>console.log('register'));
app.get('/login',  ()=>console.log('login'));

app.get('/budgets',  ()=>console.log('getBudgets'));
app.post('/budgets',  ()=>console.log('addBudget'));
app.put('/budgets/:id',  ()=>console.log('editBudget'));
app.delete('/budgets/:id',  ()=>console.log('deleteBudget'));

app.get('/transactions',  ()=>console.log('getTransactions'));
app.post('/transactions',  ()=>console.log('addTransaction'));
app.put('/transactions/:id',  ()=>console.log('editTransaction'));
app.delete('/transactions/:id',  ()=>console.log('deleteTransaction'));

app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`));