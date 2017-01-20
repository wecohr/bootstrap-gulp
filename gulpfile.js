    var gulp = require('gulp');
    var sass = require('gulp-sass');

    var dir = {
      bootstrapsass: '././bower_components/bootstrap-sass',
      production: '././production',
    };

    gulp.task('css', function(){
        return gulp.src('./development/sass/style.scss')
        .pipe(sass({
          outputStyle:'compressed',
          includePaths: [dir.bootstrapsass + '/assets/stylesheets'],
        }))
      .pipe(gulp.dest(dir.production + '/css'));
    });

gulp.task('fonts', function(){
  return gulp.src(dir.bootstrapsass + '/assets/fonts/**/*')
  .pipe(gulp.dest(dir.production + '/fonts'));
});

gulp.task('default', ['css', 'fonts']);
