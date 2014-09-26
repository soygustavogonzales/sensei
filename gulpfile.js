var gulp = require('gulp'),
	lessCss = require('gulp-less'), 
	path = require('path'),
	minifyCss = require('gulp-minify-css'),
	jsmin = require('gulp-jsmin'),
	rename = require('gulp-rename'),
	csso = require('gulp-csso'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat');

/*Tarea para precompilar un archivo .less en .css*/
var pathsFiles = {
																		less:	{
																			input:['public/stylesheets/less/*.less','public/stylesheets/less/**/*.less'],
																			output:'public/stylesheets/css/development'
																			},
																			jade: {
																				input:['views/*.jade','views/**/*.jade']
																			},
																			js:{
																				input:['public/javascripts/development/*.js','public/javascripts/development/**/*.js']
																			},
																			css:{
																				input:['public/stylesheets/css/development/*.css','public/stylesheets/css/development/**/*.css']
																			}
																	}
gulp.task('connect',function(){
	connect.server({
		//root:'site/public/stylesheets/css/development/*.css',
		host:'localhost',
		livereload:true
	});
})

gulp.task('less', function () {
  gulp.src(pathsFiles.less.input)//ruta de los archivos .less que se quieren precompilar
    .pipe(lessCss({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest(pathsFiles.less.output));//ruta destino del .css resultante
});
/*Tarea para minimizar un archivo de estilos .css*/
gulp.task('css-minify', function() {
  gulp.src('site/public/stylesheets/css/development/**/*.css')
        .pipe(csso())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('site/public/stylesheets/css/production'))
});
/*Tarea para minimizar un archivo javascript .js*/
gulp.task('js-minify', function () {
    gulp.src('site/public/js/development/**/*.js')//usando doble asteriscos (**) tambien se buscara de forma recursiva en subcarpetas
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('site/public/js/production'))//las subcarpetas tambien se crean automaticamente
        .pipe(connect.reload());

});

/*Tarea para concatenar distintos archivos css en 1*/
gulp.task('concat-css',function(){
	return gulp.src('css/dev/*.css')
	.pipe(concat('styles.css'))
	.pipe(minifyCss())
	.pipe(gulp.dest('css'))
})

//tarea de configuracion del liveReload, util para reactualizar la pagina mientras hacemos cambios en archivos

/*Tarea por default, siempre se ejecutara*/
gulp.task('default',function(){
	gulp.run('less')//corre esta tarea
	gulp.run('connect')

//Vigilancia de archivos, cuando ocurra un cambio en cualquiero de estos archivos se ejecutara la accion o tarea especificada
	gulp.watch(pathsFiles.less.input,['less'])
	gulp.watch(pathsFiles.jade.input,function(){
		/*Cada vez que haya un cambio en los archivos .jade hacer reload*/
			gulp.src(pathsFiles.jade.input)
		.pipe(connect.reload())
	})
	gulp.watch(pathsFiles.js.input,function(){
		/*Cada vez que haya un cambio en los archivos .js hacer reload*/
		gulp.src(pathsFiles.js.input).
		pipe(connect.reload())
	})
	gulp.watch(pathsFiles.css.input,function(){
		/*Cada vez que haya un cambio en los archivos .css hacer reload*/
		gulp.src(pathsFiles.css.input).
		pipe(connect.reload())
	})
})