
module.exports = function(grunt) {
  'use strict';
  
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
        'server.js',
        'socketio_server.js',
        'Gruntfile.js',
        'db/{,*/}*.js',
        'routes/{,*/}*.js',
        'test/{,*/}*.js',
        '<%= yeoman.app %>/js/{,*/}*.js',
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

    watch: {
      scripts: {
        files: ['<%= yeoman.app %>/js/{,*/}*.js'],
        tasks: ['jshint']
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
  grunt.registerTask('default', ['jshint', 'compass', 'hogan']);
  grunt.registerTask('watch', ['watch']);

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
};
