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
// app.use(cors({ 
//             origin: "http://localhost:3000"
//           }));
// const allowedOrigins = [
//   'http://localhost:3000',
//   'http://localhost:3001',
//   'https://tsogainsure.com',
//   'https://tsogainsure.africa'
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl)
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     } else {
//       return callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type']
// }));

app.use(express.urlencoded({ extended: false })) 

app.options('/api/lead/:type', cors());

app.get('/', (req, res) => {
    res.send("Home Route")
})

app.use('/api/lead', leadRoute)

app.use('/api/product', productInfoRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Listening on port " + port); 
});