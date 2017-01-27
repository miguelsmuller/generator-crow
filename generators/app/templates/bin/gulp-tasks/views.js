'use strict';

const gulp    = require('gulp')
    , pug     = require('gulp-pug')
    , plumber = require('gulp-plumber')
    , paths   = require('./../paths');

module.exports = gulp.task('views', function(){
    return gulp.src(paths.source.views)
    .pipe(plumber())
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest(paths.public.html))
});
