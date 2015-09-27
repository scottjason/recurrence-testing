var gulp = require('gulp');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');

gulp.task('default', ['concatBowerScripts', 'contactBowerStyles', 'start']);
gulp.task('build', ['concatBowerScripts', 'contactBowerStyles']);

gulp.task('concatBowerScripts', function() {
  return gulp.src(['client/bower_components/moment/moment.js', 'client/bower_components/jquery/dist/jquery.min.js', 'client/bower_components/bootstrap/dist/js/bootstrap.min.js', 'client/bower_components/angular/angular.min.js', 'client/bower_components/angular-ui-router/release/angular-ui-router.min.js', 'client/bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.js','client/bower_components/async/dist/async.min.js', 'client/bower_components/underscore/underscore-min.js', 'client/bower_components/rrule/lib/rrule.js', 'client/bower_components/rrule/lib/nlp.js' ])
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('./client/dist/'));
});

gulp.task('contactBowerStyles', function() {
  return gulp.src(['client/bower_components/bootstrap/dist/css/bootstrap.css', 'client/bower_components/angular-bootstrap-datetimepicker/src/css/datetimepicker.css'])
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest('./client/dist/'));
});



gulp.task('start', function() {
  nodemon({
      script: './server/app',
      ext: 'js'
    })
    .on('restart', function() {
      console.log('server restarted');
    });
});