const User = require('../models/User.model')

async function getAllUser(req, res) {
    const user = await User.findAll()
    res.status(200).json(user)
}

async function getOneUser(req, res) {
    let userId = req.params.userID
    const user = await User.findOne({ where: { userID: userId } })
    res.status(200).json(user)
}

async function createUser(req, res) {
    const user = await User.create(req.body)
    res.status(201).json(user)
}

module.exports = { getAllUser, createUser, getOneUser }