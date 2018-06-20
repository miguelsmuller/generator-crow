'use strict';

const gulp  = require('gulp')
    , fs    = require('fs')
    , path  = require('path')
    , tasks = fs.readdirSync('./config/gulp-tasks/');

tasks.forEach(function (task){
  require(path.join(__dirname, 'config/gulp-tasks', task));
});

gulp.task('default', ['watch', 'views', 'styles', 'scripts', 'images']);
