const express = require('express')
const routes = express.Router()
const { getAllUser, createUser } = require('../controllers/user.controller')

routes.get('/', getAllUser)
routes.post('/', createUser)

module.exports = routes