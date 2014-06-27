module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            production: {
                options: {
                    paths: ['assets/less'],
                    sourceMap: true,
                    outputSourceFiles: true,
                    syncImport: true,
                    sourceMapFilename: 'web/css/application.css.map'
                },
                files: {
                    'web/css/application.css': 'assets/css/application.less'
                }
            }
        },
        copy: {
            img: {
                files: [{
                    expand: true,
                    cwd: 'assets/img/',
                    src: '*',
                    dest: 'web/img/'
                }]
            }
        },
        uglify: {
            production: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true
                },
                files: [{
                    expand: true,
                    cwd: 'assets/js/',
                    src: '*.js',
                    dest: 'web/js/'
                }]
            }
        },
        autoprefixer: {
            production: {
                options: {
                    browsers: ['last 2 version', 'ie 8', 'ie 9'],
                    map: true
                },
                src: 'web/css/application.css',
                dest: 'web/css/application.css'
            }
        },
        csswring: {
            production: {
                options: {
                    map: true
                },
                src: 'web/css/application.css',
                dest: 'web/css/application.min.css'
            }
        },
        jshint: {
            all: ['assets/js/scripts.js']
        },
        watch: {
            options: {
                livereload: true
            },
            css: {
                files: ['assets/css/*'],
                tasks: ['less', 'autoprefixer', 'csswring']
            },
            js: {
                files: ['assets/js/*.js'],
                tasks: ['newer:uglify']
            },
            img: {
                files: ['assets/img/*'],
                tasks: ['copy']
            }
        }
    });

    // Load the plugin(s)
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-csswring');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');

    // Default task(s).
    grunt.registerTask('build', ['less', 'autoprefixer', 'csswring', 'uglify', 'copy']);
    grunt.registerTask('default', ['build', 'watch']);
};