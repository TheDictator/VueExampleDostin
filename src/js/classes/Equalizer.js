//
// Equalizer
//

'use strict';

// Components
import './../components/formstone/core';
import './../components/formstone/mediaquery';
import equalize from './../components/formstone/equalize';

const config = {
    equalizer: '.js-equalizer',
    elements: '.js-equalizer__elements'
};

class Equalizer {
    constructor( { equalizer } ) {
        this.$equalizer = equalizer;

        this.initalize();

        Equalizer.initialized.push(this);
    }

    initalize() {
        this.$equalizer.equalize({
            target: config.elements
        });
    }

    refresh() {
        this.$equalizer.equalize('resize');
    }
}

Equalizer.initialized = [];

// Driver
Equalizer.init = () => {
    let $equalizer = $(config.equalizer);

    $equalizer.each((index, elem) => {
        let $equalizer = $(elem);

        new Equalizer({
            equalizer: $equalizer
        });
    });
};

$(() => {
    if (Equalizer.autoinit !== false) {
        Equalizer.init();
    }
});

export default Equalizer;
