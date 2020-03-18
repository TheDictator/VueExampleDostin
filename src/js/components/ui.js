//
// UI
//

'use strict';

// Components
// import { Breakpoint } from './helpers';

// NPM
import Radio from 'Radio';

import './formstone/core';
import checkbox from './formstone/checkbox';

export const el = {
    $main: $('.js-main__content'),
    $window: $(window),
    $body: $('.js-body'),
    $header: $('.js-header'),
    $nav: $('.js-navigation'),
    $mobileNav: $('.js-mobile-navigation')
};

export const components = {
    init: function () {

        // adds responsive class around embeds
        this.responsiveEmbeds();

        // open link sin new tabs
        this.externalLinks();

        // homepage slideshow
        this.slideshow();

        // Attorney Slideshow
        this.attorneySlideshow();

        // nav toggle
        this.navigation();

        // map toggle
        this.mapToggle();

        // tab toggle
        this.tabToggle();

        // autosubmit form when select changes
        this.selectAutoSubmit();

        // radio buttons
        this.radioStyle();

        // search toggle
        this.searchToggle();
    },

    responsiveEmbeds: function () {
        var $embeds = el.$main.find('iframe:not([src*="disqus"]), embed');

        if (!$embeds.exists()) {
            return;
        }

        $embeds.each(function (index, elem) {
            var $elem = $(elem);
            var $parent = $elem.parent();
            var wrap = '<div class="c-embed"></div>';

            if ($parent.hasClass('c-embed')) {
                return true; // continue
            }

            $elem.removeAttr('style height width');
            $elem.addClass('c-embed__item');
            $elem.wrap(wrap);
        });
    },

    externalLinks: function () {
        $('a').each(function() {
            var a = new RegExp('/' + window.location.host + '/');
            if (!a.test(this.href)) {
                $(this).addClass('external');
                $(this).prop('target', '_blank');
            }
        });
    },

    slideshow: function () {

        $('.js-slideshow').cycle({
            swipe: true,
            loop: 0,
            fx: 'scrollHorz',
            timeout: 0,
            slides: '> .slide',
            log: false
        }).cycle('pause');

        $('.slide-caption').eq(0).addClass('is-active');

        $('.js-slideshow').on('cycle-before', (event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) => {
                var num = $(incomingSlideEl).attr('class').replace(/\D+/g, '');

               $('.slide-caption').filter('.is-active').addClass('is-out');
                $(`.slide-caption${num}`).addClass('is-active');

                setTimeout(() => $('.slide-caption').filter('.is-out').removeClass('is-out is-active'), 250);
        });
    },

    attorneySlideshow: function () {
        $('.attorney-slideshow').slick({
            slidesToShow: 4,
            slidesToScroll: 4,
            prevArrow: $('.slick-prev'),
            nextArrow: $('.slick-next'),
            responsive: [
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
                }
              },
              {
                breakpoint: 544,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
        });
    },

    navigation: function () {
        $('.nav-toggle').click(() => $('.mobilenav').toggleClass('is-open'));
    },

    mapToggle: function () {
        $('.map-box-toggle').click(() => $('.map-copy-box').toggleClass('is-open'));
    },

    tabToggle: function () {
        $('.js-tab').each((index, elem) => {
            let $elem = $(elem);
            let tab = $elem.data('tab');
            let $content = $(`.js-tab__content[data-for*="${tab}"]`);
        });
    },

    selectAutoSubmit: function () {
        $('.js-select-autosubmit').change(function () {
            var $elem = $(this);
            var $form = $elem.parents('form');

            $form.trigger('submit');
        });
    },

    radioStyle: function () {
        $('.js-radio input').checkbox();
    },

    searchToggle: function () {
        $('.js-search-trigger').on('click', () => {
            el.$body.toggleClass('search-active');
            $('.js-search__textinput').focus();

            return false;
        });
    }
};

// Events
(() => {
    el.$window.on('resize', () => Radio('ui.resize').broadcast(''));
})();

// export { components };
