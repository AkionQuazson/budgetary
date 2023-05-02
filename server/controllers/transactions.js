const {User} = require('../models/user');
const {Budget} = require('../models/budget');
const {SubBudget} = require('../models/sub_budget');
const {Transaction} = require('../models/transaction');

const getTransactions = async (req, res) => {
    console.log('getTransactions');
    const {budgetId} = req.params;
    try {
        const today = new Date();
        const year = today.getUTCFullYear();
        const month = today.getUTCMonth() + 1;
        const monthOfYear = `${year}-${month < 10 ? '0' : ''}${month}`;

        const transactionList = await Transaction.findAll({where: {budgetId, month_applicable: monthOfYear}});
        res.status(200).send(transactionList);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

const addTransaction = async (req, res) => {
    console.log('addTransaction');
    const {description, amount, month_applicable, budgetId, subBudgetId} = req.body;
    try {
        await Transaction.create({description, amount, month_applicable, budgetId, subBudgetId});
        const targetSubBudget = await SubBudget.findOne({where: {id: +subBudgetId}});
        targetSubBudget.update({amount_used:(targetSubBudget.amount_used + amount)});
        const targetBudget = await Budget.findOne({where: {id: +budgetId}});
        targetBudget.update({current_amount: (targetBudget.current_amount - amount)});
        const targetUser = await User.findOne({where: {id: targetBudget.userId}});
        targetUser.update({current_amount: (targetUser.current_amount - amount)}); 
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);        
    }
};

const editTransaction = async (req, res) => {
    console.log('editTransaction');
    const {id} = req.params;
    const {description, amount, month_applicable} = req.body;
    try {
        await Transaction.update({description, amount, month_applicable}, {where: {id: +id}});
        res.sendStatus(200)
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);        
    }
};

const deleteTransaction = async (req, res) => {
    console.log('deleteTransaction');
    const {id} = req.params;
    try {
        const targetTransaction = await Transaction.findOne({where: {id: +id}});
        const {amount} = targetTransaction;
        const targetSubBudget = await SubBudget.findOne({where: {id: targetTransaction.subBudgetId}});
        targetSubBudget.update({amount_used:(targetSubBudget.amount_used - amount)});
        const targetBudget = await Budget.findOne({where: {id: targetTransaction.budgetId}});
        targetBudget.update({current_amount: (targetBudget.current_amount + amount)});
        const targetUser = await User.findOne({where: {id: targetBudget.userId}});
        targetUser.update({current_amount: (targetUser.current_amount + amount)}); 
        targetTransaction.destroy();
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);        
    }
};

module.exports = {
    getTransactions,
    addTransaction,
    editTransaction,
    deleteTransaction
};