var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    livereload = require('gulp-livereload'),
    nib = require('nib');


gulp.task("css", function () {
    gulp
    .src("./static/stylus/**/*.styl")
    .pipe(stylus({
      use: nib(),
      compress: true
    }))
    .pipe(gulp.dest('./static/css/'))
    .pipe(livereload());;
});

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('./static/stylus/**/*.styl', ['css']);
});

gulp.task('default',['css','watch'])
