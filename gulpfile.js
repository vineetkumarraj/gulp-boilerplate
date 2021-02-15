const { watch, src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglifycss = require('gulp-uglifycss');
sass.compiler = require('node-sass');

function javascript() {
    return src([
          'node_modules/jquery/dist/jquery.js',
          'node_modules/popper.js/dist/umd/popper.min.js',
          'node_modules/bootstrap/dist/js/bootstrap.js',
          'assets/js/*.js'
        ])
        .pipe(concat('bundle.min.js'))
        // .pipe(uglify())
        .pipe(dest('build/js/'));
}

function scss() {
    return src('assets/scss/style.scss')
        .pipe(sass.sync().on('error', sass.logError))
        // .pipe(uglifycss())
        .pipe(rename('bundle.min.css'))
        .pipe(dest('build/css/'));
}

exports.default = function() {
  watch(['assets/scss/style.scss', 'assets/scss/*/*.scss'], scss);
  watch('assets/js/*.js', javascript);
};