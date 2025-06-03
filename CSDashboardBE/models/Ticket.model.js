const postgres = require('../db/postgres')
const { DataTypes } = require('sequelize')

const Tickets = postgres.define('Tickets', {
    ticketID: { type: DataTypes.INTEGER, unique: true },
    userID: { type: DataTypes.INTEGER },
    heading: DataTypes.STRING,
    description: DataTypes.STRING,
    ticketType: DataTypes.STRING,
    status: DataTypes.BOOLEAN
})

module.exports = Tickets