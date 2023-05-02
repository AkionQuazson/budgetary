const {User} = require('../models/user');

const getIncome = async (req, res) => {
    const {userId: id} = req.body;
    let foundUser = await User.findOne({where: {id}});
console.log(foundUser);
    if (!foundUser) {
        res.sendStatus(400);
    }
    res.status(200).send(JSON.stringify(foundUser.income));
}

const setIncome = async (req, res) => {
    const {income, userId: id} = req.body;
    let foundUser = await User.findOne({where: {id}});
console.log(foundUser);
    if (!foundUser) {
        res.sendStatus(400);
    }

    await foundUser.update({income: income});

    let userCreated = JSON.stringify(foundUser.createdAt);
    userCreated = userCreated.slice(1, 11);
    let userUpdated = JSON.stringify(foundUser.updatedAt);
    userUpdated = userUpdated.slice(1, 11);
    if (userCreated === userUpdated) {
        await foundUser.update({currentAmount: income})
    }
    res.status(200).send(JSON.stringify(income));
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
    getIncome, 
    setIncome,
    getBudgets,
    addBudget,
    editBudget,
    deleteBudget
};