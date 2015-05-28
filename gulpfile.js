var gulp = require("gulp"),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	minifycss = require("gulp-minify-css");


gulp.task('minifycss', function() {
	return gulp.src('src/**/*.css')
		.pipe(autoprefixer())
		.pipe(concat('slide.css'))
		.pipe(gulp.dest('dist'))
		.pipe(rename({
			suffix: '.min'
		}))
		// .pipe(sourcemaps.init())
		.pipe(minifycss())
		// .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'));

});

gulp.task('minifyjs', function() {
	return gulp.src('src/*.js')
		.pipe(concat('slide.js'))
		.pipe(gulp.dest('dist'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('default', function() {
	gulp.start('minifycss', 'minifyjs');
});

gulp.task('watch', function() {
	gulp.watch('src/*.js', ['minifyjs']);
	gulp.watch('src/*.css', ['minifycss']);
});