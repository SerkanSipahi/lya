module.exports = function(grunt) {

    'use strict';

    var watch_files = [
        'Gruntfile.js',
        'karma.conf.js',
        'tests/*.js',
        '<%= pkg.name %>.js'
    ];

    grunt.initConfig({
        jshint: {
            files: watch_files,
            options: {
                expr:true,
                newcap: false,
                quotmark: 'single',
                validthis:true,
                loopfunc: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true
            }
        },
        concat: {
            classy: {
                files: {
                    'dest': 'src'
                }
            }
        },
        watch: {
            js : {
                files: watch_files,
                tasks: ['jshint', 'karma', 'concat'],
                options : {
                    livereload : false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['jshint', 'karma', 'concat']);

};
