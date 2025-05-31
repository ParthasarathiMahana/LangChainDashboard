const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send("Hello There...")
})

app.listen(3000, (err) => {
    if (err) {
        return console.log("Error occured while starting the server!!!")
    }
    console.log("server is up and running on port 3000.")
})