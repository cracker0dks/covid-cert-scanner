## Digital Covid Certificate Decoder

Decode the Digital Covid Certificate

## Demo
https://cloud13.de/cov/

## Install and How to use

1. Run `npm install`
2. Run `npm start`
3. Surf to `127.0.0.1:8080` or your host and scan your Cov QR Code
3. The decoded data should be printed if cert is vaild like this:

```
Success: {
  1 => 'CNAM',
  4 => 1600000000,
  6 => 1600000000,
  -260 => {
    1 => {
      v: [
        {
          ci: 'urn:uvci:01:FR:XXXXXXXXXXXX#Y',
          co: 'FR',
          dn: 2,
          dt: '2021-XX-XX',
          is: 'CNAM',
          ma: 'ORG-10003XXXX',
          mp: 'EU/1/XX/XXXX',
          sd: 2,
          tg: '840539XXX',
          vp: 'J0XXXXX'
        },
        [length]: 1
      ],
      dob: 'XXXX-05-03',
      nam: { fn: 'CHEGHAM', gn: 'WASSIM', fnt: 'CHEGHAM', gnt: 'WASSIM' },
      ver: '1.3.0'
    }
  }
}
```

## Disclaimers

This Repo is in Alpha state. Do not run this in production!

Some code parts are from: Wassim Chegham https://github.com/manekinekko/digital-covid-certificate-decoder
