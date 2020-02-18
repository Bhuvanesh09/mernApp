// app.js

const express = require('express');
const connectDatabase = require('./config/db')
const cors = require('cors');
const mongoose = require('mongoose')
const userApi = require('./routes/api/userApi')
const productApi = require('./routes/api/productApi')
const orderApi = require('./routes/api/orderApi')

const app = express();
app.get('/', (req, res) => res.send('Hello world!'));
app.get('/lol', (req, res) => res.send('Boi sdfasfwosdfrld!lol'));

app.use(cors());
app.use(express.urlencoded())
app.use(express.json());

app.use('/api/userApi', userApi)
app.use('/api/productApi', productApi)
app.use('/api/orderApi', orderApi)

//Connect database
connectDatabase()

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));