const express = require('express')
require('dotenv').config()

const mysql = require('./db/mysql')
const postgres = require('./db/postgres')
const User = require('./models/user.model');
const Ticket = require('./models/ticket.model');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {

    console.log('req:', typeof req, 'res:', typeof res);
    if (!res || typeof res.setHeader !== 'function') {
        console.error('res is invalid:', res);
        return next(new Error('Response object is not available'));
    }

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

app.get('/', (req, res) => {
    res.send("Hello There...")
})
app.use('/user', require('./routes/user.route.js'))
app.use('/ticket', require('./routes/ticket.route.js'))


const connectDB = async () => {
    try {
        await mysql.sync();
        await postgres.sync();
    } catch (error) {
        console.error("Error occured while connecting with DB...", error)
    }
}
connectDB()

app.listen(4000, (err) => {
    if (err) {
        return console.log("Error occurred while starting the server!!!", err);
    }
    console.error("Server is up and running on port 3000.");
});