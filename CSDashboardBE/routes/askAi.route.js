const express = require('express')
const router = express.Router()
const {handleAskAI} = require('../controllers/askAI.controller')

router.post('/', handleAskAI)

module.exports = router