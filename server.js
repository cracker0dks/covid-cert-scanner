//@ts-check
const HTTP_PORT = 8080;
const HTTP_IP = "0.0.0.0";


import { checkCert } from "./certChecker.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import express from 'express';

var app = express();

app.use(express.static(__dirname + '/web', {
    setHeaders: function (res, path) {
        res.append('Access-Control-Allow-Origin', ['*']);
        res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.append('Access-Control-Allow-Headers', 'Content-Type');
    }
}));

app.get('/validate', function (req, res) {
    console.log(req.query.data)
    let data = req.query.data;
    console.log(data)
    checkCert(data, function(error, data) {
        res.end(JSON.stringify({error : error, data : data}));
        //console.log(error, data)
    })
})

app.listen(HTTP_PORT, HTTP_IP);

console.log("--------------------------------------------");
console.log("SERVER RUNNING ON IP:PORT: " + HTTP_IP + ':' + HTTP_PORT);
console.log("--------------------------------------------");

// checkCert(PASS, function(error, data) {
//     console.log(error, data)
// })