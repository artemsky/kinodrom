var gulp = require('gulp'),
    shorthand = require('gulp-shorthand'),
    uncss = require('gulp-uncss'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),

    dir = {
        src: "source/",
        dist: "application/",
        css: "css/",
        js: "js/",
        img: "images/",
        html: "pages/"
    };

gulp.task('JS', function(){
    return gulp(dir.src + dir.js + '**/*.js')
        .pipe(uglify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(dir.dist + dir.js))
});


gulp.task('CSS', function () {
	return gulp.src(dir.src + dir.css + '**/*.css')
        .pipe(uncss({
            html: ['index.html', dir.html + '*.html']
        }))
        .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
        .pipe(shorthand())
        .pipe(cssnano())
        .pipe(concatCss("bundle.css"))
        .pipe(gulp.dest(dir.dist + dir.css))
});