module.exports = function(grunt) { //hi
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      js: {
        src: 'public/client/*.js',
        dest: 'public/dist/<%= pkg.name %>Concat.js'
      },
      depjs: {
        src: ['public/lib/jquery.js', 'public/lib/underscore.js', 'public/lib/backbone.js', 'public/lib/handlebars.js'],
        dest: 'public/dist/<%= pkg.name %>ConcatDep.js',
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
          'public/dist/<%= pkg.name %>concat.min.js': ['<%= concat.js.dest %>'],
          'public/dist/<%= pkg.name %>concatDep.min.js': ['<%= concat.depjs.dest %>']
        }
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
          'grunt build',
          'git add public/dist/shortly-deployconcatDep.min.js -f',
          'git add public/dist/shortly-deployconcat.min.js -f',
          'git add public/dist/style.css -f',
          'git commit -m "commit concated files for deployment"',
          'git push live master'
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
    'build'
  ]);
  grunt.registerTask('build', [
    'eslint', 'concat', 'uglify', 'cssmin'
  ]);
  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
      grunt.task.run([ 'shell:prodServer' ]);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });
  grunt.registerTask('deploy', [
    // add your deploy tasks here
    'upload'
  ]);
};
