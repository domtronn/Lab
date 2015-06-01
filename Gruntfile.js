/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
		
		projects: {
			gameoflife: { title: "Game of Life", dark: false, icon: 'gameoflife' },
			delauny: { title: "Delauny Triangulation", dark: true, icon: false }, 
			stars: { title: "Stars", dark: true, icon: false },
			lsystem: { title: "L-Systems & Euler Trees", dark: false, icon: 'lsystem' }
		},
		
		htmlbuild: {
			dist: {
				src: 'views/<%= grunt.task.current.args[0] %>.html',
				dest: 'dist/', 
				options: {
					parseTag: 'build', 
					beautify: true,
					relative: true, 
					scripts: {
            main: [ 'dist/js/<%= grunt.task.current.args[0] %>.min.js' ],
						libs: [ 'dist/js/lablibs.min.js' ]
          }, 
					styles: {
						main: [ 'dist/css/<%= grunt.task.current.args[0] %>.min.css' ], 
						libs: [ 'dist/css/lablibs.min.css' ]
					}
				}
			},
			dev: {
				src: 'views/main.html',
				dest: 'views/<%= grunt.task.current.args[0] %>.html', 
				options: {
					parseTag: 'dev', 
					beautify: true,
					sections: {
						body: 'views/<%= grunt.task.current.args[0] %>.body.partial',
						controls: 'views/<%= grunt.task.current.args[0] %>.control.partial',
						scripts: 'views/<%= grunt.task.current.args[0] %>.scripts.partial'
					},
					data: {
						title: '<%= projects[ grunt.task.current.args[0] ].title %>',
						dark: '<%= projects[ grunt.task.current.args[0] ].dark %>',
						icon: '<%= projects[ grunt.task.current.args[0] ].icon %>'
					}
				}
			}
		},
    
		uglify: {
      main: {
				files: {
					'dist/js/<%= grunt.task.current.args[0] %>.min.js': [
						'js/<%= grunt.task.current.args[0] %>/*.js',
						'!js/<%= grunt.task.current.args[0] %>/main.js',
						'js/<%= grunt.task.current.args[0] %>/main.js',
						'js/control.js'
					]
				}
      }
    },
		
		cssmin: {
			libs: {
				files: {
					'dist/css/lablibs.min.css': [
						'css/lib/bootstrap.min.css', 
						'css/lib/bootstrap-slider.min.css', 
						'css/lib/font-awesome.min.css', 
					]
				}
			},
			main: {
				files: {
					'dist/css/<%= grunt.task.current.args[0] %>.min.css': [
						'css/labcontrols.css', 'css/style.css', 'css/theme.css',
						'css/<%= grunt.task.current.args[0] %>.css', 
					]
				}
			}
		},
		
		concat: {
      options: {
        stripBanners: true
      },
			libs: {
				src: [
					'js/lib/handlebars*.js',
					'js/lib/bootstrap-slider*.js'
				],
				dest: 'dist/js/lablibs.min.js'
			}
    },
		
		watch: {
			views: {
				files: ['js/**/*.js', 'css/**/*.css', 'views/*', '!views/*.html', 'views/main.html', '!**/*.min.*'], 
				tasks: ['build:dev']
			}
		},

		copy: {
			dist: {
				files: [
					{ expand: true, src: ['css/*.ico'], dest: 'dist/'},
					{ expand: true, cwd: 'css', src: ['fonts/*'], dest: 'dist/'}
				]
			}
		},
		
		clean: {
			prebuild: { src: ['dist'] }
		}
  });
	
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-html-build');

  // Default task.
  grunt.registerTask('default', ['build:dev']);

	grunt.registerTask('build', 'Complete distribution build', ['clean:prebuild', 'concat', 'cssmin:libs', 'copy:dist', 'build:dist']);

	grunt.registerTask('build:dev', 'Build development views', function () {
		
		for (var key in grunt.config('projects')) {
			grunt.task.run( 'htmlbuild:dev:' + key );
		};
		
	});
	
	grunt.registerTask('build:dist', 'Build distribution views & js', function () {
		
		for (var key in grunt.config('projects')) {
			grunt.task.run( 'cssmin:main:' + key );
			grunt.task.run( 'uglify:main:' + key );
			grunt.task.run( 'htmlbuild:dev:' + key );
			grunt.task.run( 'htmlbuild:dist:' + key );
		};
		
	});
	
};




