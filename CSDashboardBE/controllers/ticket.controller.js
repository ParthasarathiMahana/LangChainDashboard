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

async function addReplyToTicket(req, res) {
    let ticketId = req.params.ticketID
    let reply = req.body.response
    console.log(ticketId, reply);

    try {
        const ticket = await Tickets.update({ reply: reply, status: true }, { where: { ticketID: ticketId } })
        res.status(201).json({ message: "Reply added to ticket successfully." })
    } catch (error) {
        console.log("Error while updating ticket ", ticketId, error);
        res.status(500).json({ error: `Error while adding response to ${ticketId}:, ${error}` })
    }
}

module.exports = { getAllTicket, createTicket, addReplyToTicket }