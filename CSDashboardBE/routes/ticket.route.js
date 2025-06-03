const express = require('express')
const routes = express.Router()
const { getAllTicket, createTicket } = require('../controllers/ticket.controller')

routes.get('/', getAllTicket)
routes.post('/', createTicket)

module.exports = routes