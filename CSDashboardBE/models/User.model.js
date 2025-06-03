const { DataTypes } = require('sequelize')
const mysql = require('../db/mysql')

const User = mysql.define('User', {
    userID: { type: DataTypes.INTEGER, unique: true },
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true }
})

module.exports = User