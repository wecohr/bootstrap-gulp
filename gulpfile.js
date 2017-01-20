    //Inicjalizacija gulp.js i ostalih pluginova
    var gulp = require('gulp');
    var sass = require('gulp-sass');

//Inicjalizacija direktorija
    var dir = {
      bootstrapsass: '././bower_components/bootstrap-sass', //dir gdje se nalazi bootstrap sass
      production: '././production', //dir za produkciju
    };
//dir.production oznacuje direktorij

//gulp task za stvaranje css-a iz sass-a
    gulp.task('css', function(){
        return gulp.src('./development/sass/style.scss') //??
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

//defalut task za pokretanje gulp-a
gulp.task('default', ['css', 'fonts']);
