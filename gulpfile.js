'use strict';

var gulp = require('gulp'),
    compass = require('gulp-compass'),
    hogan = require('gulp-hogan-compile'),
    jshint = require('gulp-jshint'),
    karma = require('gulp-karma');

var paths = {
  scripts: [
    '*.js',
    'server/**/*.js',
    'test/**/*.js',
    'app/js/**/*.js',
    '!app/js/templates.js',
    '!app/js/mixin/with_quick_hash.js'
  ],
  sass: 'sass/**/*.sass',
  templates: 'templates/**/*.html',
  tests: 'test/**/*.js'
};

gulp.task('lint', function() {
  gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('compass', function() {
  /*jshint camelcase: false */
  gulp.src(paths.sass)
    .pipe(compass({
      config_file: './config.rb',
      css: 'app/css',
      sass: 'sass'
    }));
});

gulp.task('hogan', function() {
  gulp.src(paths.templates)
    .pipe(hogan('templates.js', {
      templateName: function(file) {
        return 'templates/'+file.path.split('templates/')[1];
      }
    }))
    .pipe(gulp.dest('app/js/'));
});

gulp.task('test', function() {
  gulp.src(paths.tests)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }));
});

gulp.task('default', function () {
  gulp.watch(paths.scripts, ['lint', 'test']);
  gulp.watch(paths.sass, ['compass']);
  //gulp.watch(paths.templates, ['hogan']);
});
