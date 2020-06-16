export default {
    api: 'http://192.168.188.28:1880',

    switches: [
        // API routes for switches (on/off => swipe right/left)
        ['/leds/on', '/leds/off',   '/leds/brightness/'],
        ['/3/on',    '/3/off',      '/3/brightness/'],
        ['/1/on',    '/1/off',      '/1/brightness/'],
        ['/2/on',    '/2/off',      '/2/brightness/'],
        ['/4/on',    '/4/off',      '/4/brightness/'],
        ['/on',      '/off',        '/brightness/'  ],
    ]
};