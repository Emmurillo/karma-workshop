var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var karma = require('karma');
var preprocess = require('gulp-preprocess');
var inject = require('gulp-inject');
var gulpSync = require('gulp-sync')(gulp);
var mainBowerFiles = require('main-bower-files');
var jscs = require('gulp-jscs');

var paths = {
  sass: ['./scss/**/*.scss'],
  css: ['./www/lib/ionic/css/ionic.css', './www/css/*.css']
};

gulp.task('css', ['sass'], function () {
  var target = gulp.src('./www/index.html');
  var sources = gulp.src(paths.css, {read: false});

  return target
          .pipe(inject(sources, {relative: true}))
          .pipe(gulp.dest('./www'));
});

gulp.task('js', function () {
  var target = gulp.src('./www/index.html');
  var sources = gulp.src(mainBowerFiles(), {read: false});

  return target
          .pipe(inject(sources, {relative: true}))
          .pipe(gulp.dest('./www'));
});

gulp.task('inject', gulpSync.sync(['js', 'css']));

gulp.task('dev', function() {
  gulp.src('./environment/envSettings.js')
    .pipe(preprocess({context: { ENV: 'DEVELOPMENT', DEBUG: true}}))
    .pipe(gulp.dest('./www/app/'));
});

gulp.task('test_env', function() {
  gulp.src('./environment/envSettings.js')
    .pipe(preprocess({context: { ENV: 'TEST', DEBUG: true}}))
    .pipe(gulp.dest('./www/app/'));
});

gulp.task('prod', function() {
  gulp.src('./environment/envSettings.js')
    .pipe(preprocess({context: { ENV: 'PRODUCTION'}}))
    .pipe(gulp.dest('./www/app/'));
});

gulp.task('default', ['inject', 'dev']);

gulp.task('sass', function(done) {
  gulp.src('./scss/style.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('test', function(done) {
  var karmaOptions = {
    configFile: __dirname + '/karma.config.js',
    singleRun: true
  };
  var doneCallback = function () {
    done();
  }
  var karmaServer = new karma.Server(karmaOptions , doneCallback);
  karmaServer.start();
});

gulp.task('validate', function(){
  return gulp.src('www/app/**/*.js')
  .pipe(jscs())
  .pipe(jscs.reporter());
});
