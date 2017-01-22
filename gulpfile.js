//-----------------------------------------INICJALIZACIJA GULP PLUGINOVA----------------------------------------------------->
    var gulp = require('gulp'),
        sass = require('gulp-sass'),
        cssscss = require('gulp-css-scss'),
        concat = require ('gulp-concat'),
        uglify = require ('gulp-uglify'),
        browserSync = require ('browser-sync').create(),
        rename = require('gulp-rename');
//------------------------------------------------------------------------------------------------------------------------------>

//--------------------------INICJALIZACIJA VARIJABLI ZA DIREKTORIJE------------------------------------------------------------->
    var dir = {
      development: '././development', //dir za temp
      bootstrapsass: '././bower_components/bootstrap-sass', //dir gdje se nalazi bootstrap sass
      production: '././production', //dir za produkciju
    };
//------------------------------------------------------------------------------------------------------------------------------>

//------------------------------------------BROWSER-SYNC------------------------------------------------------------------------>
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./development"
        }
    });
});

//------------------------------------------------------------------------------------------------------------------------------>

//--------------------------------------------SASS/CSS-------------------------------------------------------------------------->
    //BROJ JEDAN
    //pg-custom.css ---> pg-custom.scss
    gulp.task('customcss', function(){
       gulp.src(dir.development + '/css/pg-custom.css')
      .pipe(cssscss())
      .pipe(gulp.dest('development/sass/'));
    });

//BROJ DVA
//Stvaranje style.css - BOOTSTRAP & CUSTOM
    gulp.task('sass', function(){
        return gulp.src('./development/sass/style.scss') //temeljni scss gdje se sve kompajlira
        .pipe(sass({
          outputStyle:'expanded', //kompresiran css
          includePaths: [dir.bootstrapsass + '/assets/stylesheets'], //ucitava default stylesheets
        }))
      .pipe(gulp.dest(dir.production + '/css')); //output u produkciju kao style.css
    });

    //Task za stvaranje style.css
    gulp.task('css', ['customcss', 'sass']);
//------------------------------------------------------------------------------------------------------------------------------>

//--------------------------------------------FONTS--------------------------------------------------------------------------->

//kopiranje fontova u produkciju
gulp.task('fonts', function(){
  return gulp.src(dir.bootstrapsass + '/assets/fonts/**/*')
  .pipe(gulp.dest(dir.production + '/fonts'));
});
//------------------------------------------------------------------------------------------------------------------------------>

//-------------------------------------JavaScript Minify/Uglify----------------------------------------------------------------->

gulp.task('js', function () {
  gulp.src(dir.development + '/js/jquery.min.js')
  .pipe(concat('javascript.js'))
  .pipe(uglify())
  .pipe(gulp.dest(dir.production + '/js'));

  gulp.src(dir.development + '/js/bootstrap.min.js')
  .pipe(concat('bootstrap.js'))
  .pipe(uglify())
  .pipe(gulp.dest(dir.production + '/js'));
});

//------------------------------------------------------------------------------------------------------------------------------>

gulp.task('html', function(){
  gulp.src(dir.development + '/*.html')
  .pipe(gulp.dest(dir.development));
});



//-------------------------------------------------WATCH TASK--------------------------------------------------------------------->
gulp.task('watch', function () {
  gulp.watch(dir.development + '/js/*.js', ['js']).on('change', browserSync.reload); //prati sve javascript fileove u development/js i pokrece js funkciju za stvaranje js fileova
  gulp.watch(dir.development + '/css/*.css', ['css']).on('change', browserSync.reload); //prati sve promjene u development/css i pokreće css funkciju za stvaranje style.css
  gulp.watch(dir.development + '/*.html', ['html']).on('change', browserSync.reload);
});
//------------------------------------------------------------------------------------------------------------------------------>
gulp.task('default', ['js', 'css', 'fonts', 'browser-sync', 'watch']);
