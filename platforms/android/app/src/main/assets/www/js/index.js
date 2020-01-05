var app = {
    initialize: function() {
        config.switches.forEach(function(routes) {
            console.log(routes)
            var $switch = app.createSwitch(routes);
            console.log($switch)
            console.log($('body'))
            $('body').append($switch);
        });

        app.initSwiper();

        console.log("initialzed")
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
        new Swiper('.swiper-container', {
            grabCursor: true,
            initialSlide: 1,

            on: {
                transitionEnd: app.onTransitionEnd,
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

$(document).ready(function() {
    app.initialize();
});
