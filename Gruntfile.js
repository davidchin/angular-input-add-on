module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    // Configure tasks
    pkg: grunt.file.readJSON('bower.json'),

    banner: '/*!\n' +
            ' * <%= pkg.name %>.js v<%= pkg.version %>\n' +
            ' * <%= pkg.homepage %>\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
            ' * <%= pkg.license %> License\n' +
            ' */\n',

    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },

      dist: {
        src: ['src/module.js', 'src/**/*.js'],
        dest: '<%= pkg.name %>.js'
      }
    },

    ngmin: {
      dist: {
        src: '<%= pkg.name %>.js',
        dest: '<%= pkg.name %>.min.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },

      dist: {
        src: '<%= pkg.name %>.min.js',
        dest: '<%= pkg.name %>.min.js'
      }
    },

    clean: {
      dist: [
        '<%= pkg.name %>.js',
        '<%= pkg.name %>.min.js'
      ]
    },

    watch: {
      dist: {
        files: ['src/**/*.js'],
        tasks: ['build']
      }
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        commitFiles: ['-a'],
        push: false
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-karma');

  // Register custom tasks
  grunt.registerTask('test', ['karma']);
  grunt.registerTask('build', ['jshint', 'clean', 'concat', 'ngmin', 'uglify']);
};
