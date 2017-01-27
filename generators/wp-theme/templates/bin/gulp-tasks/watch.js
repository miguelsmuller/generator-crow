'use strict';

const gulp  = require('gulp')
    , paths = require('./../paths');

module.exports = gulp.task('watch', function(){
  gulp.watch('source/views/**/*.pug', ['views']);
  gulp.watch('source/styles/**/*.scss', ['styles']);
  gulp.watch(paths.source.scripts, ['scripts']);
  gulp.watch(paths.source.images, ['images']);
});
