'use strict';

const http = require('http');
const port = 3333;

const express = require('express');
const cors = require('cors');
const app = express();
// const db = require('./db');
// const authenticate = require('./middlewares/authMiddleware');

require('dotenv').config();

const sneaksAPI = require('sneaks-api');
const sneaks = new sneaksAPI();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.get('/', function(req, res) {
  return res.status(200).json({ message: 'Sneaks API' });
});

app.get('/popular', (req, res) => {
    sneaks.getMostPopular(16, (err, products) => {
        res.json(products);
    })
});

app.get('/product/:id', (req, res) => {
    sneaks.getProductPrices(req.params.id, function(err, product){
        res.json(product);
    })
})