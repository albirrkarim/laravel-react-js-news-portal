const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.react('resources/js/user/index.jsx', 'public/js/app.js');
// mix.sass('resources/sass/app.scss', 'public/css');

// mix.react('resources/js/admin/index.jsx', 'public/js/admin.js');
// mix.sass('resources/sass/admin.scss', 'public/css');



mix.js('resources/js/user/index.jsx', 'public/js/app.js')
	.react()
	.options({
	    postCss: [
	      require('autoprefixer'),
	    ],
	 })
	.version();


// mix.js('resources/js/admin/index.jsx', 'public/js/admin.js')
// 	.react()
// 	.options({
// 	    postCss: [
// 	      require('autoprefixer'),
// 	    ],
// 	 })
// 	.version();