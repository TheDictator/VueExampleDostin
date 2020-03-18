import Vue from 'Vue';
import Resource from 'vue-resource';
import _ from 'underscore';
import UriJS from 'urijs';
import * as Components from './components';

/*
 * Window Vars
 */
 window.URI = UriJS;
window._ = _;
window.Vue = Vue;

Vue.use(Resource);

// Config
Vue.config.debug = true;

/**
 * Load all components
 */
Object.keys(Components).forEach((key) => register(key));

function register(name) {
    let hyphenCase = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    Vue.component(`${hyphenCase}`, Components[name]);
}
