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
        '*.js',
        'server/**/*.js',
        'test/**/*.js',
        '<%= yeoman.app %>/js/**/*.js',
        '!<%= yeoman.app %>/js/templates.js',
        '!<%= yeoman.app %>/js/mixin/with_quick_hash.js'
      ]
    },
    
    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: '<%= yeoman.app %>/css'
        }
      }
    },

    hogan: {
      publish: {
        options: {
          prettify: true,
          amdWrapper: true
        },
        files:{
          '<%= yeoman.app %>/js/templates.js': ['templates/**/*.html']
        }
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        background: true
      }
    },

    watch: {
      scripts: {
        files: [
          '*.js',
          'server/**/*.js',
          'test/**/*.js',
          '<%= yeoman.app %>/js/**/*.js',
          '!<%= yeoman.app %>/js/templates.js',
          '!<%= yeoman.app %>/js/mixin/with_quick_hash.js'
        ],
        //run unit tests with karma (server needs to be already running)
        tasks: ['jshint', 'karma:unit:run']
      },
      css: {
        files: 'sass/**/*.sass',
        tasks: ['compass']
      },
      templates: {
        files: ['templates/**/*.html'],
        tasks: ['hogan']
      }
    }
  });

  // tasks
  grunt.registerTask('default', ['karma:unit:start watch','watch']);
  grunt.registerTask('build', ['jshint', 'compass', 'hogan']);
};
