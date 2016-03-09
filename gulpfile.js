var gulp = require('gulp');
var del = require('del');
var babel = require('gulp-babel');
var runSequence = require('run-sequence');

var buildDir = 'build';

gulp.task('clean', function() {
    return del(['build/**/*']);
});

gulp.task('compile', function() {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest(buildDir));
});

gulp.task('package', function() {
  return gulp.src('package.json').pipe(gulp.dest(buildDir + '/vendor'));
});

gulp.task('module:minimist', function() {
    return gulp.src('node_modules/minimist/**/*').pipe(gulp.dest(buildDir + '/vendor/minimist'));
});

gulp.task('module:urijs', function() {
    return gulp.src('node_modules/urijs/**/*').pipe(gulp.dest(buildDir + '/vendor/urijs'));
});

gulp.task('build', function(callback) {
    runSequence(
        'clean',
        ['compile',
        'module:minimist',
        'module:urijs'],
        callback
    );
});

gulp.task('default', ['build']);