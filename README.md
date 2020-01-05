# SwipeSwitch

<img src="https://raw.githubusercontent.com/ledeniz/swipeswitch/master/doc/preview.gif">

Mobile friendly stateless on/off switches for HTTP APIs.

Intended for using right swipe for turning "on" and left swipe for turning "off" something. 

Made for controlling lights via Node-RED.

## Installation
```sh
$ git clone https://github.com/ledeniz/swipeswitch
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

## License
MIT - do whatever you wanna do