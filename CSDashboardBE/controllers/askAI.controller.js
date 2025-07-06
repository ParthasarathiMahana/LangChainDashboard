const {askAI} = require('../langchain/communicate')
const getAllOrder = require('./order.controller')
const getAllProduct = require('./product.controller')

async function handleAskAI(req, res){
    // console.log(req.body)
    let dataForAI = req.body.ticketType === 'order' ? await getAllOrder() : await getAllProduct()
    let userDetails = req.body.userDetails
    let question = req.body.description
    let ans = await askAI(dataForAI, userDetails, question)
    res.status(200).json({answer: ans})
}

module.exports = {handleAskAI}