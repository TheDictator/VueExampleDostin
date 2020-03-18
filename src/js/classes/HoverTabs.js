//
// Practice Areas
//

import { Breakpoint } from './../components/helpers';

'use strict';

const config = {
    elem: '.js-hover-tabs__trigger',
    target: '.js-hover-tabs__target',
    id: 'hover-tabs-id',
    mobile: 'hover-tabs-mobile'
};

class HoverTabs {
    constructor( { elem, target, mobile = true } ) {
        this.$elem = elem;
        this.$target = target;
        this.mobile = (this.$elem.data(config.mobile) !== 'undefined') ? this.$elem.data(config.mobile) : mobile;

        this.events();

        HoverTabs.initialized.push(this);
    }

    events() {
        this.$elem.on('mouseenter', this.HoverTabsClick.bind(this));
    }

    HoverTabsClick() {
        if (! this.mobile && (Breakpoint.is('xs') || Breakpoint.is('sm'))) {
            return true;
        }

        if (this.$elem.hasClass('is-active')) {
            return false;
        }

        $(config.elem).removeClass('is-active');
        this.$elem.addClass('is-active');


        $(config.target).filter('.is-active').addClass('is-out');
        this.$target.addClass('is-active');

        setTimeout(() => $(config.target).filter('.is-out').removeClass('is-out is-active'), 250);

        return false;
    }
}

HoverTabs.initialized = [];

// Driver
HoverTabs.init = () => {
    let $elems = $(config.elem);

    $elems.each((index, elem) => {
        let $elem = $(elem);
        let id = $elem.data(config.id);
        let $target = $(`${config.target}[data-${config.id}="${id}"]`);

        new HoverTabs({
            elem: $elem,
            target: $target
        });
    });
};

$(() => {
    if (HoverTabs.autoinit !== false) {
        HoverTabs.init();
    }
});

export default HoverTabs;
