const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const axios = require('axios');
const ip = require('ip');
const url = 'https://exchangeratesapi.io/api/latest';

app.use(express.static(path.join(__dirname, 'build')));
console.log("========> IP ADDRESS <======");
console.log(ip.address());
app.get('/api/currencylatest', function (req, res) {
    axios.get(url)
        .then(function (response) {
            return res.send(response.data);
        })
        .catch(function (error) {
            return res.send(error.response.status);
        });
});

app.get('/api/basecurrency/:id', function (req, res) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    axios.get(url +'?base='+req.params.id)
        .then(function (response) {
            return res.send(response.data);
        })
        .catch(function (error) {
            return res.send(error.response.status);
        });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);