# fernlenke

<img src="https://raw.githubusercontent.com/ledeniz/fernlenke/master/doc/preview.gif">

## Description

Mobile friendly stateless on/off switch web app for HTTP APIs.

Intended for using right swipe for turning "on" and left swipe for turning "off" something. 

Made for controlling lights via Node-RED.

Supports modern browsers and Android (probably even iOS) via cordova.

## Installation
```sh
$ git clone https://github.com/ledeniz/fernlenke
$ cd swipeswitch
$ npm install
$ cordova run browser
```

## Configuration

Customize the `config` object in `/www/js/config.js`

```javascript
var config = {
    api: 'http://example.com/api',

    switches: [
        // API routes for switches (on/off => swipe right/left)
        [ '/on', '/off' ],
    ]
};
```

