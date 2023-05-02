const {DataTypes} = require('sequelize')

const { sequelize } = require('../util/database');


module.exports = {
    Transaction: sequelize.define('transaction', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        description: DataTypes.STRING,
        amount: DataTypes.FLOAT,
        month_applicable: DataTypes.STRING //format YYYY-MM
    })
}