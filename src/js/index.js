import 'pepjs'
import config from './config';

var app = {
    swiper: undefined,

    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        config.switches.forEach(function(routes) {
            var $switch = app.createSwitch(routes);
            $('body').append($switch);
        });

        app.initSwiper();
    },

    onTransitionEnd: function () {
        var $swiper = this.$el;
        var $slide = $swiper.find('.swiper-slide-active');
        var isCenter = $slide.hasClass('switch-center');

        if (!isCenter) {
            var route = $slide.data('route');
            app.call(route);

            this.slideTo(1);
        }
    },

    initSwiper: function() {
        app.swiper = new Swiper.default('.swiper-container', {
            grabCursor: true,
            initialSlide: 1,

            on: {
                transitionEnd: app.onTransitionEnd,
            }
        });

        app.swiper.forEach(function (swiper, key) {
            var $swiper = $(swiper.$el);
            swiper.brightness = false;

            $swiper.on('pointerdown', function (e) {
                swiper.initialX = e.clientX;
                swiper.timeout = setTimeout(function() {
                    swiper.timeout = undefined;
                    swiper.slideTo(1);
                    swiper.detachEvents();
                    swiper.brightness = true;
                }, 500);

                $swiper.css('filter', '');
            });

            $swiper.on('pointerup', function () {
                if (swiper.timeout !== undefined) {
                    clearTimeout(swiper.timeout);
                    swiper.timeout = undefined;
                }

                if (swiper.brightness) {
                    swiper.brightness = false;
                    swiper.attachEvents();
                }

                $swiper.css('filter', '');
            });

            $swiper.on('pointermove', function (e) {
                if (swiper.timeout !== undefined) {
                    var threshold = window.innerWidth * 0.05;

                    var isBigger = e.clientX > swiper.initialX + threshold;
                    var isSmaller = e.clientX < swiper.initialX - threshold;

                    if (isBigger || isSmaller) {
                        clearTimeout(swiper.timeout);
                    }
                }

                if (swiper.brightness) {
                    if (swiper.brightnessCallTimeout !== undefined) {
                        clearTimeout(swiper.brightnessCallTimeout);
                    }

                    // debouncing
                    swiper.brightnessCallTimeout = setTimeout(function() {
                        var brightness = Number(e.clientX / window.innerWidth).toFixed(1)*100;
                        if (brightness !== swiper.oldBrightness) {
                            swiper.oldBrightness = brightness;

                            $swiper.css('filter', 'brightness(' + brightness*0.1 + ')');

                            var route = config.switches[key][2] + brightness;
                            app.call( route);
                        }
                    }, 10);
                }
            });
        });
    },

    createSlide: function(type, route) {
        var $slide = $('<div class="swiper-slide"></div>');

        $slide.addClass('switch-' + type);

        if (route !== undefined) {
            $slide.attr('data-route', route);
        }

        return $slide;
    },

    createSwitch: function(routes) {
        var $switch = $('<div class="swiper-container"></div>');
        var $wrapper = $('<div class="swiper-wrapper"></div>');

        $switch.css('height', 100/config.switches.length + '%');

        $wrapper.append(app.createSlide('on', routes[0]));
        $wrapper.append(app.createSlide('center'));
        $wrapper.append(app.createSlide('off', routes[1]));

        $switch.append($wrapper);

        return $switch;
    },

    call: function (route) {
        if (route !== '' && route !== undefined) {
            $.get(config.api + route);
        }
    },
};

app.initialize();