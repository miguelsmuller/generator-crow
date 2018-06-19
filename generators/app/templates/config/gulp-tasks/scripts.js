'use strict';

const gulp    = require('gulp')
    , uglify  = require('gulp-uglify')
    , jshint  = require('gulp-jshint')
    , concat  = require('gulp-concat')
    , stylish = require('jshint-stylish')
    , plumber = require('gulp-plumber')
    , paths   = require('./../paths');

module.exports = gulp.task('scripts', function(){
    return gulp.src(paths.source.scripts)
    .pipe(plumber())
    .pipe(jshint({lookup: './.jshintrc'}))
    .pipe(jshint.reporter(stylish))
    .pipe(concat('javascript.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.public.js))
});
