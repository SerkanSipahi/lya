module.exports = function(grunt) {

    'use strict';

    var files_js = [
        'Gruntfile.js',
        'karma.conf.js',
        'tests/*.js',
        '<%= pkg.name %>.js'
    ],
    files_tests = [
        'tests/*'
    ],
    files_html = [
        'index.html'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: files_js,
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
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        watch: {
            js : {
                files: files_js.concat(files_tests),
                tasks: ['jshint'],
                options : {
                    livereload : false
                }
            },
            tests : {
                files: files_tests,
                tasks: ['karma'],
                options : {
                    livereload : false
                }
            },
            html : {
                files : files_html,
                tasks : ['karma'],
                options : {
                    livereload : false
                }
            }
        },
        concat: {
            ready: {
                files: {
                    'vendor/ready.js': 'bower_components/domready/ready.js'
                }
            }
        },
        clean : {
            bower : [
                'bower_components',
                'vendor/*.js',
                '<%= pkg.name %>.min.js'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bower-install-simple');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['jshint', 'watch:js', 'watch:html']);
    grunt.registerTask('tests', ['karma', 'watch:tests']);

    grunt.registerTask('bower', [
        'clean:bower',
        'bower-install-simple',
        'concat'
    ]);

    grunt.registerTask('clear', ['clean:bower']);

};
