//
// Ajax Pagination
//

'use strict';

// NPM
import Radio from 'Radio';

const config = {
    trigger: '.js-ajax__trigger',
    wrapper: '.js-ajax__wrapper',
    loaded: '.js-ajax__loaded'
};

class AjaxPagination {
    constructor( { trigger } ) {
        this.$trigger = trigger;
        this.href = this.$trigger.attr('href');
        this.text = this.$trigger.text();

        this.events();
    }

    events() {
        this.$trigger.on('click', this.loadContent.bind(this));
    }

    loadContent() {
        this.$trigger.addClass('is-loading');
        this.$trigger.text('Loading...');

        $.ajax({
            type: 'POST',
            url: this.href,
            data: {},
        })
        .done(this.insertData.bind(this));

        return false;
    }

    insertData(data) {
        var $wrapper = $(config.wrapper, $(data));
        var insert = `<div class="${config.loaded.replace('.', '')}">` + $wrapper.html() + '</div>';

        this.$trigger.parent().remove();

        AjaxPagination.wrapper.append(insert);

        this.updateTrigger();
        Radio('ajax.loaded').broadcast(insert);
    }

    updateTrigger() {
        this.$trigger = $(config.trigger);
        this.href = this.$trigger.attr('href');
        this.text = this.$trigger.text();
        this.events();
    }
}

AjaxPagination.initialized = [];

AjaxPagination.wrapper = $(config.wrapper)

// Driver
AjaxPagination.init = () => {
    let $trigger = $(config.trigger);

    new AjaxPagination({
        trigger: $trigger
    });
};

$(() => {
    if (AjaxPagination.autoinit !== false) {
        AjaxPagination.init();
    }
});

export default AjaxPagination;
