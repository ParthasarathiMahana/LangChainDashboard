const express = require('express')
const routes = express.Router()
const { getAllUser, createUser, getOneUser } = require('../controllers/user.controller')

routes.get('/', getAllUser)
routes.get('/:userID', getOneUser)
routes.post('/', createUser)

module.exports = routes