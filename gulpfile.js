var gulp = require('gulp');
var babel = require('gulp-babel');
var jeditor = require("gulp-json-editor");

var buildDir = 'build';

gulp.task('compile', function() {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest(buildDir));
});

gulp.task('package', function() {
  return gulp.src('package.json')
    .pipe(jeditor(function(json) {
      json.dependencies = {
        "minimist": "~ 1.2.0",
        "urijs": "~ 1.16.0"
      };

      return json;
    }))
    .pipe(gulp.dest(buildDir));
});

gulp.task('default', ['compile', 'package']);