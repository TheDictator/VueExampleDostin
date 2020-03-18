//
// Popup
//

'use strict';

// NPM
// import Radio from 'Radio';

// Components
import './../components/formstone/core';
import './../components/formstone/touch';
import './../components/formstone/transition';
import lightbox from './../components/formstone/lightbox';

const config = {
    trigger: '.js-popup',
    selector: 'popup-selector',
    height: 'popup-height',
    width: 'popup-width'
};

class Popup {
    constructor( { trigger, selector, height = 750, width = 500, showImmediately = false } ) {
        this.$trigger = trigger;
        this.selector = selector;
        this.height = height;
        this.width = width;

        if (showImmediately) {
            this.open();
        }

        this.events();

        Popup.initialized.push(this);
    }

    events() {
        if (this.$trigger == null) {
            return;
        }

        this.$trigger.on('click', this.triggerClick.bind(this));
    }

    triggerClick() {
        this.open();

        return false;
    }

    open() {
        let $el = $(document.createElement('a'));

        $el.attr('href', this.selector);
        $el.data('lightbox-height', this.height - 60);
        $el.data('lightbox-width', this.width - 60);

        $el.lightbox();

        console.log(this.selector);

        $el.trigger('click');
    }

    close() {
        $.lightbox('close');
    }
}

Popup.initialized = [];

Popup.closeAll = () => {
    $.lightbox('close');
};

// Driver
Popup.init = () => {
    let $elems = $(config.trigger);

    $elems.each((index, elem) => {
        let $trigger = $(elem);
        let selector = $trigger.data(config.selector);
        let height = $trigger.data(config.height);
        let width = $trigger.data(config.width);

        new Popup({
            trigger: $trigger,
            selector: selector,
            height: height,
            width: width
        });
    });
};

$(() => {
    if (Popup.autoinit !== false) {
        Popup.init();
    }
});

export default Popup;
