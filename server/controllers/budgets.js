const {User} = require('../models/user');
const {Budget} = require('../models/budget');
const {Subbudget} = require('../models/sub_budget');
const {Transaction} = require('../models/transaction');

const getIncome = async (req, res) => {
    const {userId: id} = req.body;
    try {
        let foundUser = await User.findOne({where: {id}});
        if (!foundUser) {
            res.sendStatus(400);
        }
        res.status(200).send(JSON.stringify(foundUser.income));
    }
    catch (error) {
        res.sendStatus(400);
    }
}

const setIncome = async (req, res) => {
    const {income, userId: id} = req.body;
    try{
        let foundUser = await User.findOne({where: {id}});
        if (!foundUser) {
            res.sendStatus(400);
        }
        const differenceInIncome = income - foundUser.income;
        await foundUser.update({income: income});
        
        let userCreated = JSON.stringify(foundUser.createdAt);
        userCreated = userCreated.slice(1, 11);
        let userUpdated = JSON.stringify(foundUser.updatedAt);
        userUpdated = userUpdated.slice(1, 11);
        if (userCreated === userUpdated) {
            await foundUser.update({currentAmount: income});
        }
        else {
            await foundUser.update({currentAmount: (foundUser.currentAmount + differenceInIncome)});
        }
        
        res.status(200).send(JSON.stringify(income));
    }
    catch (error) {
        res.sendStatus(400);
    }
};

const getBudgets = async (req, res) => {
    const {userId} = req.body;
    try {
        let budgetList = await Budget.findAll({where: {userId}});
        res.status(200).send(JSON.stringify(budgetList));
    }
    catch {
        res.status(400).send('SQL Error');
    }
};

const getSubbudgets = async (req, res) => {
    const {budgetId} = req.body;
    try {
        let subBudgetList = await Subbudget.findAll({where: {budgetId}});
        res.status(200).send(JSON.stringify(subBudgetList));
    }
    catch (error) {
        res.status(400).send('SQL Error');
    }
};

const addBudget = async (req, res) => {
    const {userId, name, amount, color, subBudgets} = req.body;
    try {
        let foundBudget = await Budget.findOne({where: {name, userId}});
        if (foundBudget) {
            res.status(400).send('Budget already exists.');
        }
        const newBudget = await Budget.create({name, current_amount: amount, monthly_amount: amount, userId, color})
        subBudgets.forEach(async (sub) => {
            await Subbudget.create({name: sub.name, amount_used: 0, budgetId: newBudget.id});
        })
        res.sendStatus(200);
    }
    catch (error) {
        res.sendStatus(400);
    }
};

const editBudget = async (req, res) => {
    const {budgetTarget, name, amount, color, subBudgets, userId} = req.body;
    try {
        const targetBud = await Budget.findOne({where: {name: budgetTarget, userId}});
        const differenceInAmount = amount - targetBud.current_amount;
        await targetBud.update({name, color, monthly_amount: (targetBud.monthly_amount + differenceInAmount)})
        const subBudgetsList = await Subbudget.findAll({where: {budgetId: id}});
        subBudgets = subBudgets.map((bud) => {
            return bud.name
        })
        subBudgetsList.forEach(async (bud, i) => {
            if (subBudgets.includes(bud.name)) {
                subBudgets.filter((name) => {return (name !== bud.name)});
            }
            else {
                await Transaction.destroy({where: {subBudgetId: bud.id}})
                await bud.destroy();
            }
        });
        subBudgets.forEach(async (name) => {
            await Subbudget.create({name, amount_used: 0, budgetId: id});
        })
        res.sendStatus(200);
    }
    catch (error) {
        res.sendStatus(400);
    }
};

const deleteBudget = async (req, res) => {
    const {budgetTarget, userId} = req.body;
    try {
        const {id} = await Budget.findOne({where: {name: budgetTarget, userId}});
        await Transaction.destroy({where: {budgetId: id}})
        await Subbudget.destroy({where: {budgetId: id}});
        await Budget.destroy({where: {id, userId}});
    }
    catch (error) {
        res.sendStatus(400);
    }
};

module.exports = {
    getIncome, 
    setIncome,
    getBudgets,
    getSubbudgets,
    addBudget,
    editBudget,
    deleteBudget
};