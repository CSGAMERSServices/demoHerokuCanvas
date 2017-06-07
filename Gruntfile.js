module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
        	heroku: {
        		src: [
        			'src/local_modules/**/*.js'
        		],
        		exclude: [
        		],
        		directives: {
        			node: true,
        			todo: true
        		},
        		options: {
        			undef: true,
					globals: {
						module:true,
						process:true,
						console:true,
						require:true,
						__dirname:false
					}
        		},
        	}
        },
        jscs: {
        	src: [
        		'src/local_modules/**/*.js',
        		'src/*.js'
        	],
        	options: {
        		//preset: "crockford",
        		config: "crockford.jscs",
        		requireCurlyBraces: [ "if" ],
        		fix: true,
        		disallowSpaceBeforeBlockStatements: true
        	}
        },
        ejslint: {
			target: ['src/**/*.ejs']
        },
    	watch: {
			default: {
				files: ['src/**/*.js'],
				tasks: ['jslint'],
				options: {
					spawn: false
				}
			}
		},
		clean: {
			default: {
				src: ['dist']
			},
			grunt: {
				src: ['Grunt.output']
			}
		}
    });
    grunt.loadNpmTasks('grunt-ejslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jscs');
    grunt.registerTask("default", ["jshint", "ejslint", "jscs"]);
};