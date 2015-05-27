var gulp = require("gulp"),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	minifycss = require("gulp-minify-css");


gulp.task('default', function() {
	return gulp.src('src/**/*.css')
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
		.pipe(minifycss())
		.pipe(concat('flow.min.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'));
		
});

gulp.task('minifycss', function() {
	return gulp.src('src/*.css') //压缩的文件
		.pipe(gulp.dest('minified/css')) //输出文件夹
		.pipe(minifycss()); //执行压缩
});