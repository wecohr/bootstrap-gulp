    //Inicjalizacija gulp.js i ostalih pluginova
    var gulp = require('gulp'),
        sass = require('gulp-sass'),
        cssscss = require('gulp-css-scss'),
        rename = require('gulp-rename');

//Inicjalizacija direktorija
    var dir = {
      bootstrapsass: '././bower_components/bootstrap-sass', //dir gdje se nalazi bootstrap sass
      production: '././production', //dir za produkciju
    };
//dir.production oznacuje direktorij

//gulp task za stvaranje css-a iz sass-a
    gulp.task('css', function(){
        return gulp.src('./development/sass/style.scss') //temeljni scss gdje se sve kompajlira
        .pipe(sass({
          outputStyle:'compressed', //kompresiran css
          includePaths: [dir.bootstrapsass + '/assets/stylesheets'], //ucitava default stylesheets
        }))
      .pipe(gulp.dest(dir.production + '/css')); //output u produkciju kao style.css
    });

//kopiranje fontova u produkciju
gulp.task('fonts', function(){
  return gulp.src(dir.bootstrapsass + '/assets/fonts/**/*')
  .pipe(gulp.dest(dir.production + '/fonts'));
});

//pg-custom ---> _custom.scss
gulp.task('customcss', function(){
  return gulp.src('production/css/pg-custom.css')
  .pipe(rename('_custom.css'))
  .pipe(cssscss())
  .pipe(gulp.dest('development/sass/'));

});
gulp.task('customcssrename', function(){
  gulp.src('development/sass/pg-custom.scss')
  .pipe(rename('_custom.scss'))
.pipe(gulp.dest('development/sass/'));

});

//defalut task za pokretanje gulp-a
gulp.task('default', ['css', 'fonts']);
