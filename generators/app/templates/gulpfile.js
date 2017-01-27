'use strict';

const gulp  = require('gulp')
    , fs    = require('fs')
    , path  = require('path')
    , tasks = fs.readdirSync('./bin/gulp-tasks/');

tasks.forEach(function (task){
  require(path.join(__dirname, 'bin/gulp-tasks', task));
});

gulp.task('default', ['watch', 'views', 'styles', 'scripts', 'images']);
