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
    checkCert(PASS, function(error, data) {
        res.end(JSON.stringify({error : error, data : data}));
        //console.log(error, data)
    })
    
})

app.listen(HTTP_PORT, HTTP_IP);

console.log("--------------------------------------------");
console.log("SERVER RUNNING ON IP:PORT: " + HTTP_IP + ':' + HTTP_PORT);
console.log("--------------------------------------------");

const PASS = `HC1:6BFSW2NA63PO/23GNA$47V77R36TVH*RBT$B03RGXHK677AH3C12*5/8O3956 M6PFU*AZ%B%LPDCNBJ4ZPC/DCRMAF5G8SJ.ROYV8JUBH+OOV4V26F:T3OQPSOGMM1.6J%LH-98QP5WBO8PVNIKX0101JHG8%7ENVIGNL-5AZQ7+0G98QZ1.CDBL1X.PD+C KSQ82$CBM23FCAZDH7OH6YJ1K4Z-MB7BW LMKGR$A+-S.T5N4TM31VK7.$0GRHG OCNI.AA7XRJHBOU9H-G4PJV3P-VB+LRI7KRSKCA7-.OWWGAWETQ9QYMZXKQ7C+Q8V2JVIFN$HL9CWW7:M8ETA/6D1TRRK7P7KQU1-0LDN2J7B942%IC56PA0RO$3K BW0R7HJ%PD8KN1QJDRL2-C8YKV%PO4U.0L$SLAUMH-M6KMK694WP7SF%MJRSLOK3/VM2OK%R44/8T1LDRSWS6KI5X-L*0POOVF5F60P%4JFG8M74F-J4DUVKDS/VWGN+BVC:F$6SG+7I5KRVP6Q7IJ0BHE/ORY SGLQ:FSXMN$4K3/9E7G$32B4`

// checkCert(PASS, function(error, data) {
//     console.log(error, data)
// })