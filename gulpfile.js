var gulp = require('gulp')
var babel = require('gulp-babel')
var rename = require('gulp-rename')

gulp.task('db', function() {
  return gulp
    .src('db.js')
    .pipe(babel())
    .pipe(gulp.dest('../pwaETM/dist'))
})
gulp.task('schema', function() {
  return gulp
    .src('schema.js')
    .pipe(babel())
    .pipe(gulp.dest('../pwaETM/dist'))
})
gulp.task('server', function() {
  return gulp
    .src('server.js')
    .pipe(babel())
    .pipe(gulp.dest('../pwaETM/dist'))
})

gulp.task('package', function() {
  return gulp
    .src('dist.json')
    .pipe(rename('package.json'))
    .pipe(gulp.dest('../pwaETM/dist'))
})
gulp.task('default', ['db', 'schema', 'server', 'package'])
