
module.exports = function(grunt) {
  'use strict';

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  
  // configuration
  grunt.initConfig({
    yeoman: {
      app: 'app',
      dist: 'dist'
    },
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/js/{,*/}*.js',
        '!<%= yeoman.app %>/js/lib/*',
        'test/spec/{,*/}*.js'
      ]
    }
  });

  // tasks
  grunt.registerTask('default', [
    'jshint'
  ]);

};
