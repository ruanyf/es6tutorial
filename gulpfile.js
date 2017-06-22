const gulp = require('gulp');
const bs = require('browser-sync').create();
const reload = bs.reload;

gulp.task('default', () => {
    bs.init({
        notify: false,
        port: 9000,
        server: {
            baseDir: './',
        }
    })
})