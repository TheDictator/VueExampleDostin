/**
 * Gulp Build Script
 * -----------------------------------------------------------------------------
 * @category   Node.js Build File
 * @package    Frunt
 * @copyright  Copyright (c) 2015 Piccirilli Dorsey
 * @license    https://opensource.org/licenses/MIT The MIT License (MIT)
 * @version    1.0
 * @link       https://github.com/picdorsey/frunt
 */

var flixir = require('flixir');

flixir.config.production = false;

flixir.config.css.autoprefix = {
    enabled: true,

    // https://www.npmjs.com/package/gulp-autoprefixer#api
    options:  {
        browsers: ['Last 2 versions', 'safari 8'],
        cascade: false
    }
};

flixir(function (mix) {

    // Styles
    mix.sass('style.scss');
    mix.sass('cp.scss');

    // Scripts
    mix.browserify('app.js', flixir.config.publicPath + '/js/bundle.js');
    mix.scriptsIn('src/js/vendor/', flixir.config.publicPath + '/js/vendor.js');

    // Browsersync (gulp watch only)
    // mix.browserSync({
    //     files: [
    //         './public/assets/css/*.css',
    //         './public/guide/assets/css/*.css',
    //         './public/assets/js/*.js',
    //         './public/**/*.html',
    //     ]
    // });

});

