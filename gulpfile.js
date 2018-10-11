var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('css', function() {
    return gulp.src('./less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css'));
})


gulp.task('default', ['css'])