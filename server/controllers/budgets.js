const {User} = require('../models/user');

const setIncome = async (req, res) => {
    const {income, userId} = req.body;
    let foundUser = await User.findOne({where: {userId}});
    if (!foundUser) {
        res.sendStatus(400);
    }
    foundUser.income = income;
    await foundUser.save();
    res.status(200).send(income);
};

const getBudgets = (req, res) => {

};

const addBudget = (req, res) => {

};

const editBudget = (req, res) => {

};

const deleteBudget = (req, res) => {

};

module.exports = {
    setIncome,
    getBudgets,
    addBudget,
    editBudget,
    deleteBudget
};