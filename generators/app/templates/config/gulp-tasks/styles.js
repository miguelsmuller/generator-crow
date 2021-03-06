'use strict';

const gulp    = require('gulp')
    , sass    = require('gulp-ruby-sass')
    , plumber = require('gulp-plumber')
    , paths   = require('./../paths');

module.exports = gulp.task('styles', function(){
    return sass(paths.source.styles, {
        compass: true,
        //style: 'expanded',
        style: 'compressed',
        cacheLocation: './config/.sass-cache/',
        loadPath: ['../../public/assets/components', 'node_modules/susy/sass']
    })
    .pipe(plumber())
    .pipe(gulp.dest(paths.public.css))
});

