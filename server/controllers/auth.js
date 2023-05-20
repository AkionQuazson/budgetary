require('dotenv').config();
const {SECRET} = process.env;
const {User} = require('../models/user');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const createToken = (username, id) => {
    return jwt.sign({username, id}, SECRET, {expiresIn: '2 days'})
}

const checkMonth = (user) => {
    const {createdAt, updatedAt} = user;
    let userCreated = JSON.stringify(createdAt);
    userCreated = userCreated.slice(1, 8);
    let userUpdated = JSON.stringify(updatedAt);
    userUpdated = userUpdated.slice(1, 8);
    return (userCreated !== userUpdated);
}

const login = async (req, res) => {
    console.log('login');
    try {
        const {username, password} = req.body;
        let foundUser = await User.findOne({where: {username}});
        if (foundUser) {
            const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass);
            if (isAuthenticated) {
                if (checkMonth(foundUser)) {
                    //add income to currentAmount
                    //update budgets
                }

                const token = createToken(foundUser.dataValues.username, foundUser.dataValues.id);
                const exp = Date.now() + 1000 * 60 * 60 * 48;
                res.status(200).send({
                    username: foundUser.dataValues.username,
                    userId: foundUser.dataValues.id,
                    income: foundUser.dataValues.income,
                    token,
                    exp
                })
            }
            else {
                res.status(400).send('cannot log in');
            }
        }
        else {
            res.status(400).send('cannot log in');
        }
    } catch (error) {
        console.log('ERROR IN register');
        console.log(error);
        res.sendStatus(400);
    }
}
const register = async (req, res) => {
    console.log('registering');
    try {
        const {username, password} = req.body;
        if (username.length < 3 || password.length < 8) {
            res.status(400).send('Username or Password too short.')
        }
        let foundUser = await User.findOne({where: {username}});
        if (foundUser) {
            res.status(400).send('Cannot create user');
        }
        else {
            const salt = bcrypt.genSaltSync(10);
            const hashedPass = bcrypt.hashSync(password, salt);
            const newUser = await User.create({username, hashedPass, income:0});
            const token = createToken(newUser.dataValues.username, newUser.dataValues.id);
            const exp = Date.now() + 1000 * 60 * 60 * 48;
            res.status(200).send({
                username: newUser.dataValues.username,
                userId: newUser.dataValues.id,
                income: newUser.dataValues.income,
                token,
                exp
            })
        }
    } catch (error) {
        console.log('Registration Error');
        console.log(error);
        res.sendStatus(400);
    }
}

module.exports = {
    login, 
    register
};