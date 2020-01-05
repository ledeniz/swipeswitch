$(document).ready(function () {
    var swipeSwitch = {
        version: 1.0,
        init: function() {
            config.switches.forEach(function(routes) {
                var $switch = swipeSwitch.createSwitch(routes);

                $('body').append($switch);
            });

            swipeSwitch.initSwiper();
        },

        onTransitionEnd: function () {
            var $swiper = this.$el;
            var $slide = $swiper.find('.swiper-slide-active');
            var isCenter = $slide.hasClass('switch-center');

            if (!isCenter) {
                var route = $slide.data('route');
                swipeSwitch.call(route);

                this.slideTo(1);
            }
        },

        initSwiper: function() {
            new Swiper('.swiper-container', {
                grabCursor: true,
                initialSlide: 1,

                on: {
                    transitionEnd: swipeSwitch.onTransitionEnd,
                }
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

            $wrapper.append(swipeSwitch.createSlide('on', routes[0]));
            $wrapper.append(swipeSwitch.createSlide('center'));
            $wrapper.append(swipeSwitch.createSlide('off', routes[1]));

            $switch.append($wrapper);

            return $switch;
        },

        call: function (route) {
            if (route !== '' && route !== undefined) {
                $.get(config.api + route);
            }
        },
    };

    swipeSwitch.init();
});