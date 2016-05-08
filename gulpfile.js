const gulp = require('gulp');
const del = require('del');
const imageResize = require('gulp-image-resize');
const imagemin = require('gulp-imagemin');

gulp.task('clean-scale-folder', function (cb) {
    return del([
        './src/images/scale/*.*'
    ]);
});

gulp.task('scale-jpg', ['clean-scale-folder'], function (cb) {
    return gulp.src(['./src/images/*.jpg', './src/images/*.jpeg'])
        .pipe(imageResize({
            height: 768,
            crop: false,
            upscale: false,
            quality: 0.95
        }))
        .pipe(gulp.dest('./src/images/scale'));
});

gulp.task('scale-png', ['clean-scale-folder'], function (cb) {
    return gulp.src(['./src/images/*.png'])
        .pipe(imageResize({
            height: 768,
            crop: false,
            upscale: false
        }))
        .pipe(gulp.dest('./src/images/temp'));
});

gulp.task('imagemin-png', ['clean-scale-folder', 'scale-png'], function (cb) {
    return gulp.src(['./src/images/temp/*.png'])
        .pipe(imagemin())
        .pipe(gulp.dest('./src/images/scale'));
});

gulp.task('clean-temp-folder', ['clean-scale-folder', 'scale-png', 'imagemin-png'], function (cb) {
    return del([
        './src/images/temp/*.*'
    ]);
});

gulp.task('images', ['clean-scale-folder', 'scale-jpg', 'scale-png', 'imagemin-png', 'clean-temp-folder']);
