const express = require('express')
require('dotenv').config()

const mysql = require('./db/mysql')
const postgres = require('./db/postgres')
const mongoConnect = require('./db/mongo.js')
// const User = require('./models/user.model');
// const Ticket = require('./models/ticket.model');
// const { route } = require('./routes/user.route.js');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {

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


app.use('/user', require('./routes/user.route.js'))
app.use('/ticket', require('./routes/ticket.route.js'))
app.use('/askAI', require('./routes/askAi.route.js'))
app.use('/product', require('./routes/product.route.js'))
app.use('/order', require('./routes/order.route.js'))

const connectDB = async () => {
    try {
        await mysql.sync();
        await postgres.sync();
        await mongoConnect();
    } catch (error) {
        console.error("Error occured while connecting with DB...", error)
    }
}
connectDB()

app.listen(4000, (err) => {
    if (err) {
        return console.log("Error occurred while starting the server!!!", err);
    }
    console.error("Server is up and running on port 4000.");
});