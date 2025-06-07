const express = require('express')
const routes = express.Router()
const { getAllTicket, createTicket, addReplyToTicket } = require('../controllers/ticket.controller')

routes.get('/', getAllTicket)
routes.post('/', createTicket)
routes.post('/:ticketID', addReplyToTicket)

module.exports = routes