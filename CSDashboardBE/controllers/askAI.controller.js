const {askAI} = require('../langchain/communicate')

function handleAskAI(req, res){
    let ans = askAI()
    res.status(200).json({answer: ans})
}

module.exports = {handleAskAI}