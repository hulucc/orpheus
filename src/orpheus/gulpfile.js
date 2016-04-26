/// <binding ProjectOpened='watch' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');
var inlineNg2Template = require('gulp-inline-ng2-template');
var del = require('del');
var livereload = require('gulp-livereload');

var libs_dev = [
    'es6-shim/es6-shim.min.js',
    'angular2/es6/dev/src/testing/shims_for_IE.js',
    'systemjs/dist/*.*',
    'rxjs/bundles/Rx.js',
    'angular2/bundles/angular2-polyfills.js',
    'angular2/bundles/angular2.dev.js',
    'angular2/bundles/http.dev.js',
    'angular2/bundles/router.dev.js',
    'jquery/dist/jquery.js',
    'bootstrap/dist/css/bootstrap.css',
    'bootstrap/dist/js/bootstrap.js',
    'bootstrap/dist/fonts/*.*',
    'moment/moment.js',
    'moment/locale/zh-cn.js',
    'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css',
    'eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
].map(function (p) { return 'node_modules/' + p; });

var libs_prod = [
    'es6-shim/es6-shim.min.js',
    'angular2/es6/prod/src/testing/shims_for_IE.js',
    'systemjs/dist/*.*',
    'rxjs/bundles/Rx.js',
    'angular2/bundles/angular2-polyfills.min.js',
    'angular2/bundles/angular2.js',
    'angular2/bundles/http.min.js',
    'angular2/bundles/router.js',
    'jquery/dist/jquery.min.js',
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap/dist/js/bootstrap.min.js',
    'bootstrap/dist/fonts/*.*',
    'moment/min/moment.min.js',
    'moment/locale/zh-cn.js',
    'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
    'eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
].map(function (p) { return 'node_modules/' + p; });


gulp.task('build.clean', function () {
    return del(['wwwroot/libs', 'wwwroot/app']);
});

gulp.task('dev.lib', function () {
    return gulp
        .src(libs_dev, { base: 'node_modules' })
        .pipe(gulp.dest('wwwroot/libs'));
});

gulp.task('prod.lib', ['build.clean'], function () {
    return gulp
        .src(libs_prod, { base: 'node_modules' })
        .pipe(gulp.dest('wwwroot/libs'));
});

var tsProject = ts.createProject('Client/tsconfig.json');
gulp.task('dev.ts', function () {
    return tsProject
        .src('Client/**/*.ts')
        .pipe(inlineNg2Template({ useRelativePaths: true }))
        .pipe(ts(tsProject))
        .pipe(gulp.dest('wwwroot/app'))
        .pipe(livereload());
});

gulp.task('prod.ts', ['build.clean'], function () {
    return tsProject
        .src('Client/**/*.ts')
        .pipe(inlineNg2Template({ useRelativePaths: true }))
        .pipe(ts(tsProject))
        //.pipe(uglify())
        .pipe(gulp.dest('wwwroot/app'));
});

gulp.task('build.dev', ['dev.lib', 'dev.ts']);
gulp.task('build.prod', ['prod.lib', 'prod.ts']);

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('Client/**/*.*', ['dev.ts'])
});