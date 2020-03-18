//
// Practice Areas
//

'use strict';

const config = {
    elem: '.js-accordion__trigger',
    target: '.js-accordion__content'
};

class Accordion {
    constructor( { elem, target } ) {
        this.$elem = elem;
        this.$target = target;

        this.isOpen = false;

        this.events();

        console.log(this.$elem);

        Accordion.initialized.push(this);
    }

    events() {
        this.$elem.on('click', this.accordionClick.bind(this));
    }

    accordionClick() {
        this.toggle();

        return false;
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.$elem.addClass('is-active');
        this.$elem.parent().addClass('is-active');
        this.$target.addClass('is-active');
        this.$target.slideDown(250);

        this.isOpen = true;
    }

    close() {
        this.$elem.addClass('is-out');
        this.$target.addClass('is-out');

        this.$target.slideUp(250);

        this.$elem.blur();

        setTimeout(() => {
            this.$elem.removeClass('is-active is-out');
            this.$elem.parent().removeClass('is-active');
            this.$target.removeClass('is-active is-out');
        }, 250);

        this.isOpen = false;
    }
}

Accordion.initialized = [];

// Driver
Accordion.init = () => {
    let $elems = $(config.elem);

    $elems.each((index, elem) => {
        let $elem = $(elem);
        let $target = $elem.next(config.target)

        new Accordion({
            elem: $elem,
            target: $target
        });
    });
};

$(() => {
    if (Accordion.autoinit !== false) {
        Accordion.init();
    }
});

export default Accordion;
