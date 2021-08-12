// MIT - 2021 Raphael Fritsch -> Original Code Wassim Chegham

/* 
EXAMPLE RAW OUTPUT AS JS OBJECT
{
  1 : 'DE',
  4 : 1660314218,
  6 : 1628778218,
  -260 : {
    1 : { 
      v: [ // an array of vaccinations, probably just 1 right now
        {
          ci: 'URN:UVCI:01DE...', // "URN:UVCI:01DE/....."  Unique Certificate Identifier: UVCI
          co: 'DE', // "DE", vaccination number
          dn: 2, // 1, 2 ... number of dose
          dt: '2021-07-27', // date of vaccination
          is: 'Robert Koch-Institut', // cert issuer
          ma: 'ORG-10...', // Marketing Authorization Holder - if no MAH present, then manufacturer
          sd: 2, // Total Series of Doses
          tg: '840539006', // Disease or agent targeted
          vp: '1119349007' // Vaccine or prophylaxis
        },
        [length]: 1
      ],
      dob: '1990-04-11', // date of birth "1990-04-11",
      nam: {
        fn: 'Musterman', // familiy name
        gn: 'Max', // firstname
        gnt: 'Max' // gn in caps and without Umlauts
      },
      ver: '1.3.0' //Version
    }
  }
}
*/

import { Certificate } from "@fidm/x509";
import { decode as _decode } from "base45-js";
import { decode } from "cbor";
import { sign } from "cose-js";
import { inflate } from "pako";
import { createHash as rawHash } from "sha256-uint8array";

import { PASS } from "./pass.js";

import * as fs from 'fs';
let rawdata = fs.readFileSync('certs.json'); //Certfile from: https://raw.githubusercontent.com/Scopevisio/eudgc/main/src/certs.json
let certs = JSON.parse(rawdata);
certs = certs["certs"];

export function checkCert(PASS, callback) {
  let certCntLeft = certs.length;
  function checkFinish() {
    certCntLeft--;
    if (certCntLeft <= 0) {
      callback("Vaccination Certificate NOT VAILD! Signature missmatch!")
    }
  }

  let success = false;
  function succeccFunish(entries) {
    success = true;
    //console.log("SUCCESS! VAILD CERTIFICATE FOUND!");
    try {
      entries = Object.fromEntries(entries);
      //getObjFromMap(entries)
      entries["-260"] = Object.fromEntries(entries["-260"]);
      //console.log(entries)
      //console.log(entries)
      callback(null, entries);
    } catch (e) {
      console.log("Error at unmapping!", e)
      callback("Error at unmapping!")
    }
  }

  var data = null;
  try {
    data = Buffer.from(PASS).toString("ASCII");

    if (data.startsWith("HC1")) {
      data = data.substring(3);
      if (data.startsWith(":")) {
        data = data.substring(1);
      } else {
        console.warn("Warning: unsafe HC1: header. Expected version: v0.0.4");
      }
    } else {
      console.warn("Warning: no HC1: header. Expected version: v0.0.4");
    }

    data = _decode(data);

    // Zlib magic headers:
    // 78 01 - No Compression/low
    // 78 9C - Default Compression
    // 78 DA - Best Compression
    //
    if (data[0] == 0x78) {
      data = inflate(data);
    }

    //console.log("Start Check!");
    for (let i in certs) {
      if (!success) {
        checkAgainsCert('-----BEGIN CERTIFICATE-----\n' + certs[i]["rawX509data"] + '\n-----END CERTIFICATE-----');
      }
    }
  } catch (e) {
    console.log("Could not parse vaccination certificate!");
    callback("Could not parse vaccination certificate!");
  }

  async function checkAgainsCert(PUB_KEY_ID) {

    const cert = Certificate.fromPEM(PUB_KEY_ID);
    const fingerprint = rawHash().update(cert.raw).digest();
    const keyID = fingerprint.slice(0, 8);
    const pk = cert.publicKey.keyRaw;
    const _keyB = Buffer.from(pk.slice(0, 1));
    const keyX = Buffer.from(pk.slice(1, 1 + 32));
    const keyY = Buffer.from(pk.slice(33, 33 + 32));

    const verifier = { key: { x: keyX, y: keyY, kid: keyID } };

    try {
      const buffer = await sign.verify(data, verifier);
      const entries = decode(Buffer.from(buffer));
      succeccFunish(entries)
      //console.log(util.inspect(entries, true, 10, true));

    } catch (err) {
      //console.error(err.message);
      checkFinish();
      //console.error(err.stack);
    }
  }
}

