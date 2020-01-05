# SwipeSwitch
Mobile friendly HTTP API Interface for stateless on/off switches.

## Installation
```
$ git clone https://github.com/ledeniz/swipeswitch
$ cd swipeswitch
$ npm install
```

## Configuration

Customize the `config` object in `config.js`

```
var config = {
    api: 'http://example.com/api',

    switches: [
        // API routes for switches (on/off => swipe right/left)
        [ '/on', '/off' ],
    ]
};
```