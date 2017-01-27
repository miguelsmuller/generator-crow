'use strict';

const gulp    = require('gulp')
    , sass    = require('gulp-ruby-sass')
    , plumber = require('gulp-plumber')
    , paths   = require('./../paths');

module.exports = gulp.task('styles', function(){
  return sass(paths.source.styles, {
    compass: true,
    require: ['susy'],
    //style: 'expanded',
    style: 'compressed',
    cacheLocation: './bin/.sass-cache/',
    loadPath: [ '../../public/assets/components' ]
  })
  .pipe(plumber())
  .pipe(gulp.dest(paths.public.css))
});
