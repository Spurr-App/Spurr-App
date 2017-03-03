module.exports = function (grunt) { //hi
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    es6transpiler: {
      options: {
        disallowUnknownReferences: false
      },
      dist: {
        files: {
          'client/dist/<%= pkg.name %>Concat.js': 'client/dist/<%= pkg.name %>Concat.js'
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      js: {
        src: ['client/app/*.js'],
        dest: 'client/dist/<%= pkg.name %>Concat.js'
      },
      html: {
        src: ['client/views/*.html'],
        dest: 'client/dist/<%= pkg.name %>HTMLConcat.html'
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'client/dist/<%= pkg.name %>Concat.js': ['client/dist/<%= pkg.name %>Concat.js']
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'client',
          src: 'dist/<%= pkg.name %>HTMLConcat.html',
          dest: 'client/'
        }]
      }
    },
    eslint: {
      target: [
        'server-config.js', 'server.js', 'app/*.js', 'app/**/*.js',
        'public/client/*.js'
      ]
    },
    cssmin: {
      options: {
        mergeIntoShorthands: true,
        roundingPrecision: -1
      },
      target: {
        files: {
          'public/dist/style.css': ['public/*.css']
        }
      }
    },
    'string-replace': {
      dist: {
        files: {
          'client/index.html': 'client/index.html',
        },
        options: {
          replacements: [
            {
                pattern: '<!--start PROD imports',
                replacement: '<!--start PROD imports-->'
            },
            {
                pattern: 'end PROD imports-->',
                replacement: '<!--end PROD imports-->'
            },
            {
                pattern: '<!--start Dev imports-->',
                replacement: '<!--start DEV imports'
            },
            {
                pattern: '<!--end Dev imports-->',
                replacement: 'end DEV imports-->'
            }
          ]
        }
      }
    },
    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },
    shell: {
      prodServer: {
        command: [
          'grunt default'
        ].join('&&')
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-es6-transpiler');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });
  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////
  grunt.registerTask('test', [
    'mochaTest'
  ]);
  grunt.registerTask('default', [
    'concat', 'es6transpiler', 'uglify', 'htmlmin'
  ]);
  grunt.registerTask('build', [
    'eslint', 'concat', 'uglify', 'cssmin'
  ]);
  grunt.registerTask('upload', function (n) {
    if (grunt.option('prod')) {
      // add your production server task here
      grunt.task.run([ 'shell:prodServer' ]);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });
  grunt.registerTask('deploy', [
    // add your deploy tasks here
    'string-replace'
  ]);
};
