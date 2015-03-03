var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify')
  , sourcemaps = require('gulp-sourcemaps');

function babelJSFiles(path, files, filename) {
  files = files.map(function (file) { return path + '/src/' + file; });
  return gulp.src(files)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat(filename))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path + '/build/'));
}

gulp.task('default', function () {
  gulp.watch('./sites/all/modules/react_example/js/src/*.js*', ['babel']);
});

gulp.task('babel', function () {
  return babelJSFiles('./sites/all/modules/react_example/js', ['MenuStore.js', '*.jsx', 'main.jsx'], 'react_example.js');
});
