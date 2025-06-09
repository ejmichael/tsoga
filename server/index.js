const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const leadRoute = require('./src/routes/leadRoute');
const dotenv = require('dotenv').config();
const connectToMongoDB = require('./db.js');
const productInfoRoute = require('./src/routes/productInfoRoute.js');


const app = express();
connectToMongoDB();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false })) 

app.get('/', (req, res) => {
    res.send("Home Route")
})

app.use('/api/lead', leadRoute)

app.use('/api/product', productInfoRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Listening on port " + port); 
});