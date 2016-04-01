var gulp = require('gulp'),
    shorthand = require('gulp-shorthand'),
    uncss = require('gulp-uncss'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    useref = require('gulp-useref'),
    ts = require('gulp-typescript'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),

    dir = {
        src: './source/',
        debug: './debug/',
        release: './release/',
        styles: {
            css: 'css/',
            scss: 'scss/',
            maps: '/'
        },
        scripts: {
            js: 'js/',
            ts: 'ts/',
            maps: '/',
            d: 'ts/typings/'
        },
        img: 'images/',
        html: 'pages/',
        dependencies: [
            'movies/**/*',
            'images/**/*',
            'pages/**/*',
            '*.!(html)'
        ]
    };

//********************** Tasks *************************************

gulp.task('cpy-dep-debug', function () {
    return gulp.src(dir.dependencies, { cwd: dir.src, base: dir.src})
        .pipe(gulp.dest(dir.debug))
});

gulp.task('cpy-dep-release', function () {
    return gulp.src(dir.dependencies, { cwd: dir.src, base: dir.src})
        .pipe(gulp.dest(dir.release))
});

/*******************************************************************
 ******************* Build Debug ***********************************
 *******************************************************************/


//Clean Debug Folder
gulp.task('cls-debug', function () {
    return gulp.src(dir.debug)
        .pipe(clean({
            force: true,
            read: false
        }));
});

//Replace blocks of html code with builds
gulp.task('cHtml-debug', function () {
    return gulp.src('**/*.html', {cwd: dir.src})
        .pipe(useref())
        .pipe(gulp.dest(dir.debug));
});

//Compile scss witch sourcemaps
gulp.task('cpm-scss-debug', function () {
    return gulp.src('**/*.scss', {cwd: dir.src + dir.styles.scss})
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write(dir.styles.maps))
        .pipe(gulp.dest(dir.debug + dir.styles.css));
});

//Compile TypeScript with sourcemaps
gulp.task('cmp-ts-debug', function () {
    return gulp.src('**/*.ts', {cwd: dir.src + dir.scripts.ts})
        .pipe(sourcemaps.init())
        .pipe(ts({
            allowJs: true,
            target:'ES5',
            noEmitOnError: true
        }))
        .pipe(sourcemaps.write(dir.styles.maps))
        .pipe(gulp.dest(dir.debug + dir.scripts.js));
});

gulp.task('cmp-ts-dd-debug', function () {
    return gulp.src('**/*.ts', {cwd: dir.src + dir.scripts.ts })
        .pipe(ts({
            allowJs: true,
            target:'ES5',
            declaration: true,
            noExternalResolve: true
        })).dts.pipe(gulp.dest(dir.src + dir.scripts.d))
});



/*******************************************************************
******************* Build Release **********************************
********************************************************************/

//******* Tasks ********

//Clean Release Folder
gulp.task('cls-release', function () {
    return gulp.src(dir.release)
        .pipe(clean({
            force: true,
            read: false
        }));
});

gulp.task('cHtml-release', function () {
    return gulp.src('**/*.html', {cwd: dir.src})
        .pipe(useref())
        .pipe(gulp.dest(dir.release));
});

//Compile TypeScript
gulp.task('cmp-ts-release', function () {
    return gulp.src('**/*.ts', {cwd: dir.src + dir.scripts.ts})
        .pipe(ts({
            allowJs: true,
            target:'ES5',
            noEmitOnError: true
        }))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dir.release + dir.scripts.js));
});

//Compile scss
gulp.task('cpm-scss-release', function () {
    return gulp.src('**/*.scss', {cwd: dir.src + dir.styles.scss})
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss('app.css'))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(uncss({
            html: [dir.src + 'index.html', dir.src + dir.html + '**/*'],
            ignore: [/\w\.in/,
                '.fade',
                '.collapse',
                '.collapsing',
                /(#|\.)navbar(\-[a-zA-Z]+)?/,
                /(#|\.)dropdown(\-[a-zA-Z]+)?/,
                /(#|\.)(open)/,
                '.modal',
                '.modal.fade.in',
                '.modal-dialog',
                '.modal-document',
                '.modal-scrollbar-measure',
                '.modal-backdrop.fade',
                '.modal-backdrop.in',
                '.modal.fade.modal-dialog',
                '.modal.in.modal-dialog',
                '.modal-open',
                '.in',
                '.modal-backdrop']
        }))
        .pipe(shorthand())
        .pipe(cssnano())
        .pipe(gulp.dest(dir.release + dir.styles.css));
});

/*******************************************************************
 ******************* Global Tasks **********************************
 ********************************************************************/


gulp.task('start', function () {
    console.log("Watching for chages...")
    gulp.watch(dir.src + dir.styles.scss + '**/*.scss', ['cpm-scss-debug']);
    gulp.watch(dir.src + dir.scripts.ts + '**/*.scss', ['cmp-ts-dd-debug', 'cmp-ts-debug']);
});

gulp.task('debug', ['cls-debug', 'cpy-dep-debug', 'cHtml-debug', 'cmp-ts-debug', 'cpm-scss-debug']);
gulp.task('release', ['cls-release', 'cpy-dep-release', 'cHtml-release', 'cmp-ts-release', 'cpm-scss-release']);

