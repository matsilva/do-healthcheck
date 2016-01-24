var gulp       = require('gulp');
var del        = require('del');
var plumber    = require('gulp-plumber');
var babel = require('gulp-babel');
var fs = require('fs');



var paths = {
    scripts: ['!./node_modules/**', 'lib/**/*.js']
};

gulp.task('clean', function(cb) {
  del(['build'], cb);
});

gulp.task('node-babel', function () {
    return gulp.src(paths.scripts)
		.pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch("./lib/**", ["node-babel"]);
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['node-babel', 'watch']);
