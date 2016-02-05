//gulp plugins

var
      gulp           =   require('gulp'),
      sass           =   require('gulp-sass'),
      plumber        =   require('gulp-plumber'),
      browserSync    =   require('browser-sync').create(),
      autoprefixer   =   require('gulp-autoprefixer');

//gulp-sass

gulp.task('sass', function(){
  gulp.src('./sass/*.sass')
  .pipe(plumber())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(autoprefixer({
     browsers: ['last 4 versions'],
     cascade: false
   }))
  .pipe(gulp.dest('./css'))
  .pipe(browserSync.stream());
});

//gulp serve
gulp.task('serve', function() {
  browserSync.init({
      proxy: "yourlocal.dev"
  });
});

gulp.task('watch', function(){
  gulp.watch('./sass/*.sass', [sass])
  gulp.watch('./*.html', browserSync.reload())
});

gulp.task('default', ['watch','sass','serve']);
