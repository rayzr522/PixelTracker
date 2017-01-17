const gulp = require('gulp');
const eslint = require('gulp-eslint');

const paths = {
    allSrcFiles: 'src/**/*.js',
    clientSrc: 'src/client/**/*.js',
    serverSrc: 'src/server/**/*.js',
    gulpfile: 'gulpfile.js',
    serverEntry: 'src/server/index.js'
}

const server = {
    spawn: require('child_process').spawn,
    start: function() {
        this.stop();
        this.instance = this.spawn('node', [paths.serverEntry], { stdio: 'inherit' });
        this.instance.on('close', () => {
            console.log('Server stopped.');
        });
    },
    stop: function() {
        if (this.instance) this.instance.kill();
    }
}

gulp.task('lint', () =>
    gulp.src([paths.allSrcFiles, paths.gulpfile])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
);

gulp.task('server', ['lint'], () => server.start());
gulp.task('watch-server', () => gulp.watch(paths.serverSrc, ['server']));

gulp.task('default', ['server', 'watch-server']);

process.on('exit', () => { server.stop() });