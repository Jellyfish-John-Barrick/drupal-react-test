// ========================================
// Gulpfile for Jellyfish SASS Framework
// ========================================

var theme_path        = 'web/themes/custom/grey/';
var sass_path        = 'src/sass/';

// load plugins
var gulp = require('gulp'), // https://www.npmjs.com/package/gulp
merge = require('merge-stream');
// compass = require('gulp-compass'),   // https://www.npmjs.com/package/gulp-compass
sass = require('gulp-sass'),    // https://www.npmjs.com/package/gulp-sass
// sass = require('gulp-ruby-sass'),    // https://www.npmjs.com/package/gulp-ruby-sass
autoprefixer = require('gulp-autoprefixer'),    // https://www.npmjs.com/package/gulp-autoprefixer
cssnano = require('gulp-cssnano'),  // https://www.npmjs.com/package/gulp-cssnano
sourcemaps = require('gulp-sourcemaps'),    // https://www.npmjs.com/package/gulp-sourcemaps
// jshint = require('gulp-jshint'), // https://www.npmjs.com/package/gulp-jshint
uglify = require('gulp-uglify'),    // https://www.npmjs.com/package/gulp-uglify
rename = require('gulp-rename'),    // https://www.npmjs.com/package/gulp-rename
concat = require('gulp-concat'),    // https://www.npmjs.com/package/gulp-concat
notify = require('gulp-notify'),    // https://www.npmjs.com/package/gulp-notify
// cache = require('gulp-cache'),   // https://www.npmjs.com/package/gulp-cache
plumber = require('gulp-plumber'),  // https://www.npmjs.com/package/gulp-plumber
order = require('gulp-order'),  // https://www.npmjs.com/package/gulp-order
path = require('path'), // https://www.npmjs.com/package/path
iife = require("gulp-iife"),    // https://www.npmjs.com/package/gulp-iife
del = require('del');


// error notification settings for plumber
var plumberErrorHandler = {
  errorHandler: notify.onError({
    message: "Error: <%= error.message %>"
  })
  // error message must be wrapped in double QUOTES!!!
};


// sass/scss
gulp.task('main', function () {
  gulp.src(sass_path + 'gulp-main.scss') // define the target core sass file
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError)) // on save, if error, spit out error message?
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 9', 'ie 10'],
      cascade: false
    }))
    .pipe(rename('main.min.css'))   // (new file) add a suffix of .min
    .pipe(cssnano())  // run css nano (minifycss)
    .pipe(sourcemaps.write('.'))  // write the sourcemaps template to the current directory
    .pipe(gulp.dest(theme_path + 'css/'));    // {prod} place it in /{theme}/css/
});


// wysiwyg sass/scss
gulp.task('wysiwyg', function () {

  // wysiwyg shared styles
  gulp.src(sass_path + 'gulp-wysiwyg-shared.scss') // define the target core sass file
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError)) // on save, if error, spit out error message?
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 9', 'ie 10'],
      cascade: false
    }))
    .pipe(rename('wysiwyg-shared.min.css'))   // (new file) add a suffix of .min
    .pipe(cssnano())  // run css nano (minifycss)
    .pipe(sourcemaps.write('.'))  // write the sourcemaps template to the current directory
    .pipe(gulp.dest(theme_path + 'css/'));    // {prod} place it in /{theme}/css/

  // wysiwyg only
  gulp.src(sass_path + 'gulp-wysiwyg-only.scss') // define the target core sass file
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError)) // on save, if error, spit out error message?
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 9', 'ie 10'],
      cascade: false
    }))
    .pipe(rename('wysiwyg-only.min.css'))   // (new file) add a suffix of .min
    .pipe(cssnano())  // run css nano (minifycss)
    .pipe(sourcemaps.write('.'))  // write the sourcemaps template to the current directory
    .pipe(gulp.dest(theme_path + 'css/'));    // {prod} place it in /{theme}/css/

});


// paragraphs sass/scss
gulp.task('paragraphs', function () {

  // paragraphs
  gulp.src(theme_path + 'templates/paragraphs/gulp-paragraphs.scss') // define the target file
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError)) // on save, if error, spit out error message?
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 9', 'ie 10'],
      cascade: false
    }))
    .pipe(rename('paragraphs.min.css'))   // (new file) add a suffix of .min
    .pipe(cssnano())  // run css nano (minifycss)
    .pipe(sourcemaps.write('.'))  // write the sourcemaps template to the current directory
    .pipe(gulp.dest(theme_path + 'templates/paragraphs/'));

  /* need to work out individual paragraphs
  // paragraph: text
  var paragraph_text = gulp.src(theme_path + 'templates/paragraphs/text/gulp-paragraph-text.scss') // define the target file
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError)) // on save, if error, spit out error message?
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 9', 'ie 10'],
      cascade: false
    }))
    .pipe(rename('paragraph-text.min.css'))   // (new file) add a suffix of .min
    .pipe(cssnano())  // run css nano (minifycss)
    .pipe(sourcemaps.write('.'))  // write the sourcemaps template to the current directory
    .pipe(gulp.dest(theme_path + 'templates/paragraphs/text/'));

  // paragraph: boxes
  var paragraph_boxes = gulp.src(theme_path + 'templates/paragraphs/text/gulp-paragraph-boxes.scss') // define the target file
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError)) // on save, if error, spit out error message?
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 9', 'ie 10'],
      cascade: false
    }))
    .pipe(rename('paragraph-boxes.min.css'))   // (new file) add a suffix of .min
    .pipe(cssnano())  // run css nano (minifycss)
    .pipe(sourcemaps.write('.'))  // write the sourcemaps template to the current directory
    .pipe(gulp.dest(theme_path + 'templates/paragraphs/boxes/'));

  // paragraph: image + text
  var paragraph_image_text = gulp.src(theme_path + 'templates/paragraphs/text/gulp-paragraph-image-text.scss') // define the target file
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError)) // on save, if error, spit out error message?
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 9', 'ie 10'],
      cascade: false
    }))
    .pipe(rename('paragraph-image-text.min.css'))   // (new file) add a suffix of .min
    .pipe(cssnano())  // run css nano (minifycss)
    .pipe(sourcemaps.write('.'))  // write the sourcemaps template to the current directory
    .pipe(gulp.dest(theme_path + 'templates/paragraphs/image-text/'));

  // paragraph: view
  var paragraph_view = gulp.src(theme_path + 'templates/paragraphs/view/gulp-paragraph-view.scss') // define the target file
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError)) // on save, if error, spit out error message?
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 9', 'ie 10'],
      cascade: false
    }))
    .pipe(rename('paragraph-view.min.css'))   // (new file) add a suffix of .min
    .pipe(cssnano())  // run css nano (minifycss)
    .pipe(sourcemaps.write('.'))  // write the sourcemaps template to the current directory
    .pipe(gulp.dest(theme_path + 'templates/paragraphs/view/'));

  //return merge(paragraphs, paragraph_text, paragraph_boxes, paragraph_image_text, paragraph_view);
  */

});


// bootstrap sass/scss
gulp.task('bootstrap', function () {

  // bootstrap-grid
  gulp.src(sass_path + 'vendors/bootstrap/bootstrap-reboot.scss') // define the target sass file
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError)) // on save, if error, spit out error message?
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 9', 'ie 10'],
      cascade: false
    }))
    .pipe(rename('bootstrap-reboot.min.css'))   // (new file) add a suffix of .min
    .pipe(cssnano())  // run css nano (minifycss)
    .pipe(sourcemaps.write('.'))  // write the sourcemaps template to the current directory
    .pipe(gulp.dest(theme_path + 'css/'));    // {prod} place it in /{theme}/css/

  // bootstrap-grid
  gulp.src(sass_path + 'vendors/bootstrap/bootstrap-grid.scss') // define the target sass file
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError)) // on save, if error, spit out error message?
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 9', 'ie 10'],
      cascade: false
    }))
    .pipe(rename('bootstrap-grid.min.css'))   // (new file) add a suffix of .min
    .pipe(cssnano())  // run css nano (minifycss)
    .pipe(sourcemaps.write('.'))  // write the sourcemaps template to the current directory
    .pipe(gulp.dest(theme_path + 'css/'));    // {prod} place it in /{theme}/css/

});


// run all tasks
gulp.task('default', ['main', 'wysiwyg', 'paragraphs', 'bootstrap'], function() { });


// gulp watch tasks
gulp.task('watch', function() {
  gulp.watch(sass_path + '**/*.scss', ['main', 'wysiwyg', 'bootstrap']);  // watch changes for ANY directory & ANY .scss file inside of "/sass"
  gulp.watch(theme_path + 'templates/paragraphs/**/*.scss', ['paragraphs']); // watch inside templates/paragraphs
});
