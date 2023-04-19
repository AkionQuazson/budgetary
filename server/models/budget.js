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
        amount_used: DataTypes.FLOAT,
        amount_allotted: DataTypes.FLOAT,
        month_applicable: DataTypes.INTEGER
    })
}