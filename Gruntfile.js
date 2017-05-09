// Gruntfile

module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  /**
   * Define Configuration Variables.
   * Note: cwd is './setup' so the `setup` variable defined below is only to be used
   *       when cwd has been changed to `app` and grunt needs to reference './setup'
   */
  var gruntConfig = grunt.file.readJSON('Gruntconfig.json');

  // Grunt Config
  grunt.initConfig({
    cvars: gruntConfig.configVars,
    bower: {
      setup: {
        options: { install: true, copy: false }
      }
    },

    copy: {
      setup: {
        files: [
          // Javascript with standard .min.js naming convention
          {
            cwd: 'bower_components', expand: true, flatten: true,
            dest: '<%= cvars.app %>/libs/',
            src: gruntConfig.bowerFiles
          },
          // CSS with standard .min.css naming convention
          {
            cwd: 'bower_components', expand: true, flatten: true,
            dest: '<%= cvars.app %>/<%= cvars.appcss %>/css/',
            src: gruntConfig.cssFiles
          },
          // CSS Fonts
          {
            cwd: 'bower_components', expand: true, flatten: true,
            dest: '<%= cvars.app %>/<%= cvars.appcss %>/fonts/',
            src: gruntConfig.cssFonts
          }
        ]
      },
      build: {
        files: [
          {
            cwd: '<%= cvars.app %>/', expand: true,
            dest: '<%= cvars.build %>/',
            src: gruntConfig.buildFiles
          }
        ]
      },
      deploy: {
        files: [
          {
            cwd: '<%= cvars.build %>/', expand: true,
            dest: '<%= cvars.dist %>/',
            src: ['<%= cvars.appcss %>/**', 'images/**', 'api/**', 'libs/*.swf']
          }
        ]
      }
    },
    clean: {
      options: { force: true },
      build: ['<%= cvars.build %>'],
      postConcat: [
        '<%= cvars.build %>/modules/oms/**/*.js',
        '<%= cvars.build %>/modules/push/**/*.js',
        '!<%= cvars.build %>/modules/oms/module.js',
        '!<%= cvars.build %>/modules/push/module.js',
      ],
      'post-requirejs': ['<%= cvars.build %>/libs'],
      deploy: [
        '<%= cvars.dist %>/*'
      ]
    },
    cssmin: {
      build: {
        files: [{
            cwd: '<%= cvars.app %>/<%= cvars.appcss %>/', expand: true,
            dest: '<%= cvars.build %>/<%= cvars.appcss %>/',
            src: ['**/*.css']
          }]
      }
    },
    preprocess: {
      build: {
        src : '<%= cvars.app %>/index.html',
        dest : '<%= cvars.build %>/index.build.html'
      }
    },
    htmlmin: {
      // See https://github.com/yeoman/grunt-usemin/issues/44 for using 2 passes
      build: {
        options: {
          removeComments: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          //collapseBooleanAttributes: true,
          //removeAttributeQuotes: true,
          //removeRedundantAttributes: true,
          //removeEmptyAttributes: true,
          // Cannot remove empty elements with angular directives
          //removeEmptyElements: false
        },
        files: [
          { '<%= cvars.build %>/index.html': '<%= cvars.build %>/index.build.html' },
          {
            cwd: '<%= cvars.app %>/', expand: true, flatten: false,
            dest: '<%= cvars.build %>/',
            src: ['**/*.html']
          }
        ]
      },
      deploy: {
        options: {
          collapseWhitespace: true
        },
        files: [
          { '<%= cvars.dist %>/index.html': '<%= cvars.build %>/index.html' },
        
          {
            cwd: '<%= cvars.build %>/', expand: true,
            dest: '<%= cvars.dist %>/',
            src: ['**/*.html']
          }
        ]
      }
    },
    requirejs: {
      build: {
        options: {
          baseUrl: '<%= cvars.app %>',
          mainConfigFile: '<%= cvars.app %>/config.js',
          removeCombined: true,
          findNestedDependencies: true,
          optimize: 'none',
          //optimizeCss: "standard",
          dir: '<%= cvars.build %>/',
          modules: [

            //paths of lib files
            { 
              name: 'config',
              include: [
                'angular',
                'angularAMD'
              ] 
            },

            //app var configuration
            {
              name: 'appconfig',
              exclude: [ 'main' ]
            },

            //with all the libs used in app
            {
              name: 'main',
              exclude: [ 'config' ]
            },

            //oms module
            { 
              name: 'modules/oms/module',
              exclude: [ 'config', 'main' ]
            },

            //push module
            { 
              name: 'modules/push/module',
              exclude: [ 'config', 'main' ]
            }
          ]
        }
      }
    },
    concat: {
      options: {
        process: function(src, filepath){
          
          filepath = filepath.substring(filepath.indexOf('/') + 1, filepath.indexOf('.'));
          console.log('filepath=', filepath, typeof src);

          return src.replace('define([', 'define(\'' + filepath + '\', [');
        }
      },
      oms: {
        src: [
          '<%= cvars.build %>/modules/oms/**/*.js'
        ],
        dest: '<%= cvars.build %>/modules/oms/module.js'
      },
      push: {
        src: [
          '<%= cvars.build %>/modules/push/**/*.js'
        ],
        dest: '<%= cvars.build %>/modules/push/module.js'
      }
    },
    uglify: {
      deploy: {
        options: {
          preserveComments: false,
          // sourceMapIncludeSources: true,
          // sourceMap: true,
          mangle: false,
          parse: {
            strict: true
          },
          compress: {
            drop_console: true
          }
        },
        files: [
          {
            cwd: '<%= cvars.build %>/', 
            expand: true,
            dest: '<%= cvars.dist %>/',
            src: '**/*.js'
          }
        ]
      }
    },
    jshint: {
      build: {
        options: {
          jshintrc: '.jshintrc'
        },
        files: {
          src: [
            '<%= cvars.app %>/*.js',
            '<%= cvars.app %>/**/*.js'
          ]
        }
      }
    },

    watch: {
      dev: {
        files: ['<%= cvars.app %>/**/*'],
        tasks: [],
        options: {
          spawn: false,
          livereload: true
        }
      },
      build: {
        files: ['<%= cvars.build %>/**/*'],
        tasks: [],
        options: {
          spawn: false,
          livereload: true
        }
      },
      dist: {
        files: ['<%= cvars.dist %>/**/*'],
        tasks: [],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src : [ 
            '<%= cvars.app %>/**/*.html',
            '<%= cvars.app %>/**/*.css',
            '<%= cvars.app %>/**/*.js'
          ]
        },
        options: {
          open: false,
          watchTask: true,
          server: '<%= cvars.app %>'
        }
      },
      build: {
        bsFiles: {
          src : [ 
            '<%= cvars.build %>/**/*.html',
            '<%= cvars.build %>/**/*.css',
            '<%= cvars.build %>/**/*.js'
          ]
        },
        options: {
          open: false,
          watchTask: true,
          server: '<%= cvars.build %>'
        }
      },
      dist: {
        bsFiles: {
          src : [ 
            '<%= cvars.dist %>/**/*.html',
            '<%= cvars.dist %>/**/*.css',
            '<%= cvars.dist %>/**/*.js'
          ]
        },
        options: {
          open: false,
          watchTask: true,
          server: '<%= cvars.dist %>'
        }
      }
    }
  });


  /**
   * setup task
   * Run the initial setup, sourcing all needed upstream dependencies
   */
  grunt.registerTask('setup', [
    // 'bower:setup',
    'copy:setup'
  ]);


  /**
   * devel task
   * Launch webserver and watch for changes
   */
  grunt.registerTask('serve:dev', [
    'browserSync:dev', 'watch:dev'
  ]);
  grunt.registerTask('serve:build', [
    'browserSync:build', 'watch:build'
  ]);
  grunt.registerTask('serve:dist', [
    'browserSync:dist', 'watch:dist'
  ]);

  /**
   * build task
   * Use r.js to build the project
   */
  grunt.registerTask('build', [
    //'jshint:build',
    'clean:build',
    'preprocess:build',
    'htmlmin:build',
    'cssmin:build',
    'requirejs:build',
    'concat',
    'clean:postConcat',
    'copy:build'
  ]);


  /**
   * deploy task
   * Deploy to dist_www directory
   */
  grunt.registerTask('deploy', [
    'build',
    'clean:deploy',
    'htmlmin:deploy',
    'copy:deploy',
    'uglify:deploy'
  ]);

  grunt.registerTask('hello', function () {
    grunt.log.write('hello task called with: ', gruntConfig);
  });

};
