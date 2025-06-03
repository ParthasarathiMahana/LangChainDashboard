const Tickets = require('../models/Ticket.model')

async function getAllTicket(req, res) {
    const tickets = await Tickets.findAll()
    res.status(200).json(tickets)
}

async function createTicket(req, res) {
    console.log(req.body);
    try {
        const ticket = await Tickets.create(req.body)
        res.status(201).json(ticket)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error while creating ticket!!!" })
    }
}

module.exports = { getAllTicket, createTicket }