// Generated on 2013-09-14 using generator-webapp 0.4.2
'use strict';

module.exports = function (grunt) {
	// show elapsed time at the end
	require('time-grunt')(grunt);
	// load all grunt tasks
	require('load-grunt-tasks')(grunt);

	// configurable paths
	var yeomanConfig = {
		app: 'app',
		dist: 'dist',
		tmp: 'tmp'
	};

	grunt.initConfig({
		yeoman: yeomanConfig,
		watch: {
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= yeoman.app %>/*.html',
					'.tmp/styles/{,*/}*.css',
					'{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
					'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},
		connect: {
			options: {
				port: 9000,
				livereload: 35729,
				hostname: 'localhost'
			},
			livereload: {
				options: {
					open: true,
					base: [
						'.tmp',
						yeomanConfig.app
					]
				}
			},
			test: {
				options: {
					base: [
						'.tmp',
						'test',
						yeomanConfig.app
					]
				}
			},
			dist: {
				options: {
					open: true,
					base: yeomanConfig.dist
				}
			}
		},
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yeoman.dist %>/*',
						'!<%= yeoman.dist %>/.git*',
						'<%= yeoman.tmp %>/*'
					]
				}]
			},
			server: '.tmp'
		},
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/styles/'
				}]
			}
		},
		requirejs: {
			dist: {
				options: {
					baseUrl: yeomanConfig.app + '/scripts',
					modules: [],
					dir: '<%= yeoman.tmp %>/js',
					preserveLicenseComments: false,
					useStrict: false,
					wrap: true
				}
			}
		},
		uglify: {
			minify:{
				files:{
					'<%= yeoman.dist %>/app.min.js':
						[
							'<%= yeoman.app %>/scripts/*.js'
						]
				}
			}
		},
		useminPrepare: {
			options: {
				dest: '<%= yeoman.dist %>',
				cssmin: 'less'
			},
			html: '<%= yeoman.app %>/index.html'
		},
		usemin: {
			options: {
				dirs: ['<%= yeoman.dist %>']
			},
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.less']
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.svg',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeCommentsFromCDATA: true,
					 collapseBooleanAttributes: true,
					 removeAttributeQuotes: true,
					 removeRedundantAttributes: true,
					 useShortDoctype: true,
					 removeEmptyAttributes: true,
					 removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>',
					src: '*.html',
					dest: '<%= yeoman.dist %>'
				}]
			}
		},
		less: {
			production: {
				options: {
					paths: [
						'<%= yeoman.app %>/styles'
					],
					yuicompress: true
				},
				files: {
					'<%= yeoman.dist %>/app.min.css': '<%= yeoman.app %>/styles/main.less'
				}
			}
		},
		preprocess: {
			prod: {
				src: ['<%= yeoman.dist %>/*.html'],
				options: {
					src : '<%= yeoman.app %>/*.html',
					dest : '<%= yeoman.dist %>/*.html',
					inline: true,
					context: {
						production: true
					}
				}
			}
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'images/{,*/}*.{webp,gif}',
						'styles/fonts/{,*/}*.*',
						'vendor/**',
						'api/*'
					]
				}]
			}
		},
		concurrent: {
			server: [],
			test: [],
			dist: [
				'imagemin',
				'svgmin',
				'htmlmin'
			]
		},
		bower: {
			options: {
				exclude: []
			},
			all: {
				rjsConfig: '<%= yeoman.app %>/scripts/main.js'
			}
		},
		qunit: {
			files: ['test/**/*.html']
		}
	});

	grunt.registerTask('server', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'concurrent:server',
			'autoprefixer',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('test', [
		'clean:server',
		'concurrent:test',
		'autoprefixer',
		'connect:test',
		'qunit'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'less',
		'useminPrepare',
		'concurrent:dist',
		'autoprefixer',
		'requirejs',
		'uglify',
		'copy:dist',
		'usemin',
		'preprocess'
	]);

	grunt.registerTask('default', [
		'test',
		'build'
	]);
};
