    //Inicjalizacija gulp.js i ostalih pluginova
    var gulp = require('gulp'),
        sass = require('gulp-sass'),
        cssscss = require('gulp-css-scss'),
        rename = require('gulp-rename');

//Inicjalizacija direktorija
    var dir = {
      development: '././development', //dir za temp
      bootstrapsass: '././bower_components/bootstrap-sass', //dir gdje se nalazi bootstrap sass
      production: '././production', //dir za produkciju
    };
//dir.production oznacuje direktorij


//Stvaranje style.css - BOOTSTRAP & CUSTOM
    gulp.task('sass', function(){
        return gulp.src('./development/sass/style.scss') //temeljni scss gdje se sve kompajlira
        .pipe(sass({
          outputStyle:'expanded', //kompresiran css
          includePaths: [dir.bootstrapsass + '/assets/stylesheets'], //ucitava default stylesheets
        }))
      .pipe(gulp.dest(dir.production + '/css')); //output u produkciju kao style.css
    });


//BROJ DVA
//pg-custom.css ---> pg-custom.scss
gulp.task('customcss', function(){
   gulp.src(dir.development + '/css/pg-custom.css')
  .pipe(cssscss())
  .pipe(gulp.dest('development/sass/'));

});

//kopiranje fontova u produkciju
gulp.task('fonts', function(){
  return gulp.src(dir.bootstrapsass + '/assets/fonts/**/*')
  .pipe(gulp.dest(dir.production + '/fonts'));
});

//Task za stvaranje style.css
gulp.task('css', ['customcss', 'sass']);
