module.exports = function(grunt) {
	
	// Project configuration.
	grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
		assemble: {
			options: {
				flatten: true,
				layoutdir: "src/layouts",
				partials: 'src/partials/**/*.hbs',
				helpers: 'src/helpers/**/*.js',
				data: 'src/json/**/*.json'
			},
			pages: {
				files: {
					'site/'	:	'src/templates/**/*.hbs'
				}
			}
        },
		less: {
            style: {
                files: {
                    "src/assets/css/site.css": "src/assets/less/site.less"
                },
                options: {
                	compress: true,
                    yuicompress: false,
                    optimization: 2,
                    cleancss:false,  
                    paths: ["css"],   
                    syncImport: false,
                    strictUnits:false,
                    strictMath: true,
                    strictImports: true,
                    ieCompat: false 
                }
            }
        },
        bower: {
			main: {
				dest: 'site/assets',
				js_dest: 'site/assets/js',
				css_dest: 'site/assets/css',
				options: {
					expand: true,
					keepExpandedHierarchy: false
				}
			}
		},
		copy: {
			assets: {
				files: [{
					expand: true,
					cwd: 'src/assets',
					dest: 'site/assets',
					src: [
						'css/**',
						'img/**',
						'js/**'
					]
				}]
			},
			htaccess: {
				src: 'sample.htaccess',
				dest: 'site/.htaccess'
			},
			json: {
				files: [{
					expand: true,
					cwd: 'src/json',
					dest: 'site/json',
					src: ['**']
				}]
			},
			ionicon: {
				files: [
				    // Ionic fonts
				    {
				      expand: true,
				      cwd: 'bower_components/ionicons/fonts/',
				      src: ['**'],
				      dest: 'site/assets/css/fonts'
				    }
				]
			},
			bootstrap: {
				files: [
				    //TODO: Can't get bootstrap to move correctly with just bower....
				    {
				      expand: true,
				      cwd: 'bower_components/bootstrap/dist/css/',
				      src: ['bootstrap.min.css'],
				      dest: 'site/assets/css'
				    }
				]
			}
			
		},
		clean: {
			all: ['site/**', 'site/assets/**']
		},
		watch: {
			assemble: {
				files: ['src/**/*.hbs','src/**/*.css'],
				tasks: ['assemble']
			},
			less: {
				files: ['src/assets/less/**/*.less'],
				tasks: ['less','copy:assets']
			},
			js: {
				files: ['src/assets/js/**/*.js'],
				tasks: ['copy:assets']
			},
			htaccess: {
				files: ['sample.htaccess'],
				tasks: ['copy:htaccess']
			},
			json: {
				files: ['src/json/**/*.json'],
				tasks: ['copy:json']
			},
		}
	});
	
	grunt.loadNpmTasks('grunt-assemble');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-bower');
	grunt.loadNpmTasks('grunt-contrib-copy');
	
	grunt.registerTask('default', ['clean', 'assemble', 'less', 'bower', 'copy']);

};