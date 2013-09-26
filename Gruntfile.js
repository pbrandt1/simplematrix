module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'lib/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    mochacli: {
      options: {
        require: ['should'],
        reporter: 'landing',
        bail: true
      },
      all: ['tests/**/*.js']
    },
    jshint: {
      files: ['index.js', 'lib/**/*.js', 'test/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: false,
        globals: {
          require: true,
          define: true,
          requirejs: true,
          describe: true,
          expect: true,
          exports: true,
          module: true

        }
      }
    },
    watch: {
      files: '<%= jshint.files %>',
      tasks: ['jshint', 'mocha']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('grunt-release');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'mochacli']);

  grunt.registerTask('test', ['mochacli']);

};