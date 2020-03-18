//
// Helpers
//

'use strict';

// Modules
import { el } from './ui';

export const Breakpoint = {
    is: function (alias) {
        return $('.device-' + alias).is(':visible');
    }
};

$(() => {
    if ($('.device-xs').exists()) {
        return;
    }

    el.$body.append(`
        <div class="device-xs u-hidden-sm-up"></div>
        <div class="device-sm u-hidden-xs-down u-hidden-md-up"></div>
        <div class="device-md u-hidden-sm-down u-hidden-lg-up"></div>
        <div class="device-lg u-hidden-md-down"></div>
    `);
});
