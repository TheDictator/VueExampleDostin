/*
 * @app
 * @author Piccirilli Dorsey
 */

'use strict';

// Vue
import './vue/bootstrap';
import vueApp from './vue/app';

// Modules
import { components as ui } from './components/ui';
import tracking from './components/tracking';

// Classes
import Accordion from './classes/Accordion';
import AjaxPagination from './classes/AjaxPagination';
import Equalizer from './classes/Equalizer';
import Form from './classes/Form';
import HoverTabs from './classes/HoverTabs';
import MegaMenu from './classes/MegaMenu';
import Popup from './classes/Popup';
import Share from './classes/Share';
import ToggleTabs from './classes/ToggleTabs';

const app = {
    init() {
        ui.init();
        tracking.init();

        this.windowVars();
    },

    windowVars() {
        window.Accordion = Accordion;
        window.AjaxPagination = AjaxPagination;
        window.Equalizer = Equalizer;
        window.Form = Form;
        window.HoverTabs = HoverTabs;
        window.MegaMenu = MegaMenu;
        window.Popup = Popup;
        window.Share = Share;
        window.ToggleTabs = ToggleTabs;
    }
};

// Bind Vue
new Vue(vueApp).$mount('.o-app');

// Call the initialize function
$(() => app.init());
