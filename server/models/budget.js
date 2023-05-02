const {DataTypes} = require('sequelize')

const { sequelize } = require('../util/database');


module.exports = {
    Budget: sequelize.define('budget', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        budget_name: DataTypes.STRING,
        current_amount: DataTypes.FLOAT,
        monthly_amount: DataTypes.FLOAT,
        color: DataTypes.STRING //format #hexhex
    })
}