//
// Practice Areas
//

import { Breakpoint } from './../components/helpers';

'use strict';

const config = {
    elem: '.js-toggle-tabs__trigger',
    target: '.js-toggle-tabs__target',
    id: 'toggle-tabs-id',
    mobile: 'toggle-tabs-mobile'
};

class ToggleTabs {
    constructor( { elem, target, mobile = true } ) {
        this.$elem = elem;
        this.$target = target;
        this.mobile = (this.$elem.data(config.mobile) !== 'undefined') ? this.$elem.data(config.mobile) : mobile;

        this.events();

        ToggleTabs.initialized.push(this);
    }

    events() {
        this.$elem.on('click', this.ToggleTabsClick.bind(this));
    }

    ToggleTabsClick() {
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

ToggleTabs.initialized = [];

// Driver
ToggleTabs.init = () => {
    let $elems = $(config.elem);

    $elems.each((index, elem) => {
        let $elem = $(elem);
        let id = $elem.data(config.id);
        let $target = $(`${config.target}[data-${config.id}="${id}"]`);

        new ToggleTabs({
            elem: $elem,
            target: $target
        });
    });
};

$(() => {
    if (ToggleTabs.autoinit !== false) {
        ToggleTabs.init();
    }
});

export default ToggleTabs;
