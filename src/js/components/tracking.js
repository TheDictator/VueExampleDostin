//
// Tracking
//

'use strict';

const tracking = {
    init: function () {
        this.phoneNumberTracking();
    },

    phoneNumberTracking: function () {
        $('[href*="tel"]').on('click', function () {
            var $elem = $(this);
            var number = $elem.text();

            ga('send', {
                hitType: 'event',
                eventCategory: 'phoneNumber',
                eventAction: 'click',
                eventLabel: number
            });

            return true;
        });
    }
};

export default tracking;
