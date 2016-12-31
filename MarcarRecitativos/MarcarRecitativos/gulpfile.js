var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var wait = require('gulp-wait');

gulp.task('default', function () {

});

gulp.task('libraries', function () {
  return gulp
    .src([
      './Scripts/libraries/angularjs/angular.min.js',
      './Scripts/libraries/angularjs/angular-route.min.js',
      './Scripts/libraries/jquery/jquery-3.1.1.min.js',
      './Scripts/libraries/bootstrap/bootstrap.min.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('build-libraries.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./Scripts/application.build/'))
});

// funções gerais que podem ser usadas em toda a aplicação
gulp.task('geral-app', function () {
  return gulp
    .src('./Scripts/application.release/geral.application.js')
    .pipe(sourcemaps.init())
    .pipe(concat('geral-app.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./Scripts/application.build/'))
});

// funções gerais que podem ser usadas no contexto de recitativos
gulp.task('geral-recitativos', function () {
  return gulp
    .src('./Scripts/application.release/recitativos/geral.recitativos.js')
    .pipe(sourcemaps.init())
    .pipe(concat('geral-recitativos.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./Scripts/application.build/'))
});

// arquivo principal de aplicação e configuração do angular
gulp.task('main-app', function () {
  return gulp
    .src('./Scripts/application.release/recitativos/app.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./Scripts/application.build/'))
});

// directives
gulp.task('directives', function () {
  return gulp
    .src('./Scripts/application.release/recitativos/directives/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('directives.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./Scripts/application.build/'))
});

// factories
gulp.task('factories', function () {
  return gulp
    .src('./Scripts/application.release/recitativos/factories/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('factories.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./Scripts/application.build/'))
});

// controllers
gulp.task('controllers', function () {
  return gulp
    .src('./Scripts/application.release/recitativos/controllers/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('controllers.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./Scripts/application.build/'))
});

gulp.task('sourcemaps', function () {
  return gulp.src('./Scripts/application.dev/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./Scripts/application.release/'));
})

gulp.task('scripts', ['libraries', 'geral-app', 'geral-recitativos', 'main-app', 'directives', 'factories', 'controllers'], function () {
  return gulp
    // busca os arquivos javascript
    .src([
      './Scripts/application.build/geral-app.js',
      './Scripts/application.build/geral-recitativos.js',
      './Scripts/application.build/app.js',
      './Scripts/application.build/directives.js',
      './Scripts/application.build/factories.js',
      './Scripts/application.build/controllers.js',
    ])

    // concatena todos os arquivos em somente um
    .pipe(concat('build-app.js'))

    // envia o arquivo criado para a pasta abaixo
    .pipe(gulp.dest('./Scripts/application.build/'));
});

gulp.task('watch', function () {
  // gulp.watch('./Scripts/application.dev/**/*.js', ['sourcemaps', 'scripts']);
  return watch('./Scripts/application.dev/**/*.js', function() {
    gulp.start('sourcemaps');

    setTimeout(function() {
      gulp.start('scripts');
    }, 250);
  })
})