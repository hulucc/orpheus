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

var libs = [
    'core-js/client/*.js',
    'zone.js/dist/*.js',
    'reflect-metadata/Reflect.js',
    'systemjs/dist/*.*',
    'rxjs/**/*.js',
    //'rxjs/bundles/Rx.js',
    '@angular/*/bundles/*.js',
    'angular2-in-memory-web-api/*.js',
    'jquery/dist/*.js',
    'bootstrap/dist/css/*.css',
    'bootstrap/dist/js/*.js',
    'bootstrap/dist/fonts/*.*',
    'moment/moment.js',
    'moment/min/moment.min.js',
    'moment/locale/zh-cn.js',
    'eonasdan-bootstrap-datetimepicker/build/css/*.css',
    'eonasdan-bootstrap-datetimepicker/build/js/*.js',
    'bootstrap-multiselect/dist/css/*.css',
    'bootstrap-multiselect/dist/js/*.js',
    'TableHeadFixer/tableHeadFixer.js',
].map(function (p) { return 'node_modules/' + p; });

var templates = [
    '**/*.html',
    '**/*.css'
];

gulp.task('libs.clean', function () {
    return del(['wwwroot/libs']);
});

gulp.task('libs.build', ['libs.clean'], function () {
    return gulp
        .src(libs, { base: 'node_modules' })
        .pipe(gulp.dest('wwwroot/libs'));
});

gulp.task('ts.clean', function () {
    return del(['wwwroot/app']);
});


gulp.task('ts.copy', ['ts.clean'], function () {
    return gulp
        .src(templates, { base: 'Client' })
        .pipe(gulp.dest('wwwroot/app'));
});

var tsProject = ts.createProject('Client/tsconfig.json');
gulp.task('ts.build', ['ts.clean'], function () {
    return tsProject
        .src('Client/**/*.ts')
        .pipe(inlineNg2Template({ useRelativePaths: true }))
        .pipe(ts(tsProject))
        //.pipe(uglify())
        .pipe(gulp.dest('wwwroot/app'))
        .pipe(livereload())
        ;
});

gulp.task('build', ['libs.build', 'ts.build', 'ts.copy']);

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('Client/**/*.*', ['ts.build'])
});