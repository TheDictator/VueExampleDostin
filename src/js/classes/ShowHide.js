//
// Show Hide
//

'use strict';

export default class ShowHide {
    constructor( { elem, openTrigger, closeTrigger, timeout = false, openCallback = () => {}, closeCallback = () => {} } ) {
        this.$elem = elem;
        this.$openTrigger = openTrigger;
        this.$closeTrigger = closeTrigger;
        this.timeout = timeout;
        this.openCallback = openCallback;
        this.closeCallback = closeCallback;

        this.events();
    }

    events() {
        this.$openTrigger.on('click', this.show.bind(this));
        this.$closeTrigger.on('click', this.hide.bind(this));
    }

    show() {
        this.$elem.addClass('is-active');
        this.$openTrigger.addClass('is-active');

        this.openCallback();

        return false;
    }

    hide() {
        this.$elem.addClass('is-closing');
        this.$closeTrigger.addClass('is-closing');

        setTimeout(() => {
            this.$elem.removeClass('is-closing is-active');
            this.$closeTrigger.removeClass('is-closing is-active');
            this.closeCallback();

        }, ((this.timeout) ? this.timeout : 0));

        return false;
    }
}
