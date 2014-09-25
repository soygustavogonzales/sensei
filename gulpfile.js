var gulp = require('gulp'),
	lessCss = require('gulp-less'), 
	path = require('path'),
	//uncss = require('gulp-uncss'),
	minifyCss = require('gulp-minify-css'),
	jsmin = require('gulp-jsmin'),
	//coffee = require('gulp-coffee'),
	rename = require('gulp-rename'),
	csso = require('gulp-csso'),
	//gutil = require('gulp-util'),
	//liveReload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat');

/*Tarea para precompilar un archivo .less en .css*/
gulp.task('less', function () {
  gulp.src('site/public/stylesheets/less/*.less')//ruta de los archivos .less que se quieren precompilar
    .pipe(lessCss({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('site/public/stylesheets/css/development'));//ruta destino del .css resultante
});
/*Tarea para minimizar un archivo de estilos .css*/
gulp.task('css-minify', function() {
  gulp.src('site/public/stylesheets/css/development/**/*.css')
        .pipe(csso())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('site/public/stylesheets/css/production'))
        .pipe(connect.reload());
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
gulp.task('connect',function(){
	connect.server({
		//root:'site/public/stylesheets/css/development/*.css',
		host:'localhost',
		livereload:true
	});
})

/*
*/
gulp.task('jade',function(){
		gulp.src('site/views/**/*.jade')
		.pipe(connect.reload())
})
/*Tarea por default, siempre se ejecutara*/
gulp.task('default',function(){
	gulp.run('less')//corre esta tarea
	gulp.run('css-minify')
	//gulp.run('coffee')
	gulp.run('js-minify')
	gulp.run('connect')
	gulp.run('jade')
	//gulp.run('uncss')

//Vigilancia de archivos, cuando ocurra un cambio en cualquiero de estos archivos se ejecutara la accion o tarea especificada
	gulp.watch('site/public/stylesheets/less/*.less',function(){
		gulp.run('less')
		//gulp.run('uncss')
	})
	gulp.watch('site/public/stylesheets/css/development/**/*.css',function(){
		gulp.run('css-minify')
	})
	/*
	gulp.watch('site/public/javascripts/coffee/*.coffee',function(){
		gulp.run('coffee')
	})
*/
	gulp.watch('site/public/js/development/**/*.js',function(){
		gulp.run('js-minify')
	})
	gulp.watch('site/views/**/*.jade',function(){
		gulp.run('jade')
	})
})