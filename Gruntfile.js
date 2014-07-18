//TODO: Add CSS Minification


module.exports = function(grunt) {

  // configure the tasks
  grunt.initConfig({

    copy: {

      build: {
        cwd: 'source',
        src: [ '**', '!**/*.styl' ],
        dest: 'build',
        expand: true
      },
    },

    stylus: {

      build: {
        options: {
          linenos: false,
          compress: false
        },

        files: [{
          expand: true,
          cwd: 'source',
          src: [ '**/*.styl' ],
          dest: 'build',
          ext: '.css'
        }]
      }
    },

    autoprefixer: {

      build: {
        expand: true,
        cwd: 'build',
        src: [ '**/*.css' ],
        dest: 'build'
      }
    },

    clean: {

      build: {
        src: [ 'build' ]
      },
    },

    watch: {

      stylesheets: {
        files: 'source/**/*.styl',
        tasks: [ 'stylesheets' ]
      },
      copy: {
        files: [ 'source/**', '!source/**/*.styl' ],
        tasks: [ 'copy' ]
      }
    },

    connect: {
      server: {
        options: {
          port: 4000,
          base: 'build',
          hostname: '*'
        }
      }
    },

    imagemin: {                          // Task
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'source/',                // Source matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'build/img'              // Destination path prefix
        }]
      }
    },

  });

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-stylus');

  // define the tasks
  grunt.registerTask(
  'stylesheets',
  'Compile the stylesheets, compress images.',
    [ 'stylus', 'autoprefixer', 'imagemin' ]
  );

  grunt.registerTask(
  'build',
  'Compile and overwrite all assets to build directory.',
    [ 'clean', 'copy', 'stylesheets' ]
  );

  grunt.registerTask(
  'default',
  'Watch files, rebuild on change and run server.',
    [ 'build', 'connect', 'watch' ]
  );
};
