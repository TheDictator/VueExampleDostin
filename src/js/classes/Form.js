//
// Form
//

'use strict';

// NPM
import Validator from 'validator';
// import BurntToast from 'burnt-toast';

const config = {
    form: '.js-form',
    required: '.js-form__required',
    email: '.js-form__email',
    submit: '.js-form__submit',
    errorClass: 'has-error',
    emailError: 'Please enter a valid email address.',
    requiredError: 'This field is required.'
};

class Form {
    constructor( { form } ) {
        this.$form = form;
        this.$required = this.$form.find(config.required);
        this.$email = this.$form.find(config.email);
        this.$submit = this.$form.find(config.submit);
        this.$monitor = this.$form.find(config.monitor);

        this.events();

        Form.initialized.push(this);
    }

    events() {
        this.$form.on('submit', this.formSubmit.bind(this));
        this.$submit.on('click', () => this.$form.trigger('submit'));
        this.$required.on('keypress input propertychange paste change', this.requiredChange.bind(this));
    }

    requiredChange() {
        if (this.validateRequired(false)) {
            this.enableSubmit();
        } else {
            this.disableSubmit();
        }
    }

    enableSubmit() {
        this.$submit.removeClass('is-disabled');
        this.$submit.addClass('is-enabled');
    }

    disableSubmit() {
        this.$submit.removeClass('is-enabled');
        this.$submit.addClass('is-disabled');
    }

    formSubmit() {
        // remove existing errors
        this.removeAllErrors();

        return this.validateRequired() && this.validateEmail();
    }

    validateRequired(showError = true) {
        let pass = true;

        this.$required.each((index, elem) => {
            let $elem = $(elem);
            let val = $elem.val();

            if (! val || 0 === val.length) {
                if (showError) this.addError(config.requiredError, $elem);
                pass = false;
            }
        });

        return pass;
    }

    validateEmail(showError = true) {
        let pass = true;

        this.$email.each((index, elem) => {
            let $elem = $(elem);
            let val = $elem.val();

            if (! Validator.isEmail(val)) {
                if (showError) this.addError(config.emailError, $elem);
                pass = false;
            }
        });

        return pass;
    }

    addError(message, $field) {
        $field.addClass(config.errorClass);

        // new BurntToast().makeToast(message, {
        //     duration: 4000
        // });
    }

    removeError($field) {
        $field.removeClass(config.errorClass);
    }

    removeAllErrors() {
        this.$form.find(`.${config.errorClass}`).removeClass(config.errorClass);
    }
}

Form.initialized = [];

// Driver
Form.init = () => {
    let $elems = $(config.form);

    $elems.each((index, elem) => {
        let $elem = $(elem);

        new Form({
            form: $elem
        });
    });
};

$(() => {
    if (Form.autoinit !== false) {
        Form.init();
    }
});

export default Form;
