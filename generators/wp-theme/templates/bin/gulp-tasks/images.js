'use strict';

const gulp     = require('gulp')
    , plumber  = require('gulp-plumber')
    , imagemin = require('gulp-imagemin')
    , paths    = require('./../paths');

module.exports = gulp.task('images', function(){
  return gulp.src(paths.source.images)
  .pipe(plumber())
  .pipe(imagemin({
      progressive: true
  }))
  .pipe(gulp.dest(paths.public.images))
});
