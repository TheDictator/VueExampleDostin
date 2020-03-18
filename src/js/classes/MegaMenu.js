//
// Mega Menu
//

'use strict';

const config = {
    nav: '.js-mega-menu__nav',
    dropdown: '.js-mega-menu__dropdown',
    id: 'mega-menu-id'
};

class MegaMenu {
    constructor( { nav, dropdown, id } ) {
        this.$nav = nav;
        this.$dropdown = dropdown;
        this.id = id;

        this.events();

        MegaMenu.initialized.push(this);
    }

    events() {
        this.$nav.on('mouseover', this.onMouseOver.bind(this));
        this.$nav.on('mouseout', () => setTimeout(this.onMouseOut.bind(this), 2));
        this.$dropdown.on('mouseout', () => setTimeout(this.onMouseOut.bind(this), 2));
    }

    onMouseOver() {
        this.show();
    }

    onMouseOut() {
        if ($(`[data-${config.id}="${this.id}"]:hover`).length > 0) {
            return;
        }

        // if (this.$dropdown.is(':hover') || this.$nav.is(':hover')) {
        //     return;
        // }

        this.hide();
    }

    show() {
        this.$nav.addClass('is-active');
        this.$dropdown.addClass('is-active');
    }

    hide() {
        this.$nav.removeClass('is-active');
        this.$dropdown.addClass('is-out');

        setTimeout(() => {
            this.$dropdown.removeClass('is-active is-out');
        }, 250);
    }
}

MegaMenu.initialized = [];

// Driver
MegaMenu.init = () => {
    let $elems = $(config.nav);

    $elems.each((index, elem) => {
        let $nav = $(elem);
        let id = $nav.data(config.id);
        let $dropdown = $(`${config.dropdown}[data-${config.id}="${id}"]`);

        new MegaMenu({
            nav: $nav,
            dropdown: $dropdown,
            id: id
        });
    });
};

$(() => {
    if (MegaMenu.autoinit !== false) {
        MegaMenu.init();
    }
});

export default MegaMenu;
