// app.js

const express = require('express');
const connectDatabase = require('./config/db')
const cors = require('cors');
const mongoose = require('mongoose')
const userApi = require('./routes/api/userApi')


const app = express();
app.get('/', (req, res) => res.send('Hello world!'));
app.get('/lol', (req, res) => res.send('Boi sdfasfwosdfrld!lol'));

app.use(cors());
app.use(express.urlencoded())

app.use(express.json());
app.use('/api/userApi', userApi)

//Connect database
connectDatabase()

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));