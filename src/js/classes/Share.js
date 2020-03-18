//
// Share
//
// https://gist.github.com/jonathanmoore/2640302
//

'use strict';

// NPM
import 'babel-polyfill';
import co from 'co';

// Components
import Popup from './Popup';

const config = {
    share: '.js-share',
    facebook: '.js-share--facebook',
    twitter: '.js-share--twitter',
    linkedin: '.js-share--linkedin',
    email: '.js-share--email',
    action: '.js-share__action',
    badge: '.js-share__badge'
};

class Share {
    constructor( { elem } ) {
        this.$elem = elem;
        this.$action = this.$elem.find(config.action) || this.$elem;
        this.$badge = this.$elem.find(config.badge);

        this.type = this.getType();
        this.url = this.getUrl();
        this.title = document.title;

        this.initialize();
        this.events();

        Share.initialized.push(this);
    }

    initialize() {
        // this.populateShareCount();
    }

    events() {
        this.$action.on('click', this.actionClick.bind(this));
    }

    getType() {
        if (this.$elem.hasClass(config.facebook.replace('.', ''))) return 'facebook';
        if (this.$elem.hasClass(config.twitter.replace('.', ''))) return 'twitter';
        if (this.$elem.hasClass(config.email.replace('.', ''))) return 'email';
        if (this.$elem.hasClass(config.linkedin.replace('.', ''))) return 'linkedin';
    }

    getUrl() {
        return this.$action.attr('href') ? this.$action.attr('href') : window.location.href;
    }

    actionClick() {
        if (this.type == 'facebook') this.shareFacebook();
        if (this.type == 'twitter') this.shareTwitter();
        if (this.type == 'email') this.shareEmail();
        if (this.type == 'linkedin') this.shareLinkedin();

        return false;
    }

    shareFacebook() {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${this.url}`, `Share this Story`, `width=480,height=360,resizable=no,toolbar=no,menubar=no,location=no,status=no`);
    }

    shareTwitter() {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURI(this.title)}%20${encodeURI(this.url)}`, `Share this Story`, `width=480,height=360,resizable=no,toolbar=no,menubar=no,location=no,status=no`);
    }

    shareLinkedin() {
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${this.url}&title=${this.title}`, `Share this Story`, `width=480,height=360,resizable=no,toolbar=no,menubar=no,location=no,status=no`);
    }

    shareEmail() {

        Popup.closeAll();

        setTimeout(() => new Popup({
            trigger: null,
            selector: this.url,
            height: 900,
            width: 700,
            showImmediately: true
        }), 300);

    }

    populateShareCount() {
        co(function* () {
            var count = yield this.getShareCount();

            if (count > -1) {
                this.$badge.addClass('is-active');
                this.$badge.text(count);
            }
        }.bind(this));
    }

    getShareCount() {
        return co(function* () {
            if (this.type == 'facebook') return yield Promise.resolve(this.getFacebookShareCount());
            if (this.type == 'twitter') return yield Promise.resolve(this.getTwitterShareCount());

            // fallback
            return Promise.resolve(-1);

        }.bind(this));
    }

    getFacebookShareCount() {
        return co(function* () {
            let response = yield $.ajax({
                url: `https://graph.facebook.com/?id=${this.url}`
            });

            if (typeof response.shares == 'undefined') {
                return Promise.resolve(-1);
            }

            return Promise.resolve(response.shares);

        }.bind(this));
    }

    getTwitterShareCount() {
        return co(function* () {

            return Promise.resolve(-1);

            // This doesn't work anymore :'(
            let response = yield $.ajax({
                url: `https://cdn.api.twitter.com/1/urls/count.json?url=${this.url}`
            });

            if (typeof response.count == 'undefined') {
                return Promise.resolve(-1);
            }

            return Promise.resolve(response.count);

        }.bind(this));
    }
}

Share.initialized = [];

// Driver
Share.init = () => {
    let $elems = $(config.share);

    $elems.each((index, elem) => {
        let $elem = $(elem);

        new Share({
            elem: $elem
        });
    });
};

$(() => {
    if (Share.autoinit !== false) {
        Share.init();
    }
});

export default Share;
