'use strict';

import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import jshint from 'gulp-jshint';
import imagemin from 'gulp-imagemin';
import imagewebp from 'gulp-webp';
import gulpif from 'gulp-if';

import fileinclude from 'gulp-file-include';
import server from 'browser-sync';

// SERVER
server.create();

const options = {
    styleFile: 'scss', /* sass | scss */
    src: './app/',
    dest: './public/'
};

/**************************************************************************************/
/**************************************************************************************/
/**************************************************************************************/

/* ======= COPY ASSETS AFTER BUILD ======= */
async function buildCodes() {

    /* ======= CSS ======= */
    /* ======= CSS ======= */
    /* ======= CSS ======= */
        gulp.src(options.src + 'lib/styles/**/*.' + options.styleFile) // gulp.src() çalıştır - sass kaynak dosyaları
            .pipe(sourcemaps.init()) // sourcemaps.init() çalıştır
            .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError)) // css çıktı dosyasını sıkıştır
            .pipe(rename({ suffix: '.min' }))
            .pipe(sourcemaps.write('./')) // sourcemaps.write() çalıştır
            .pipe(gulp.dest(options.dest + 'assets/css')); // gulp.dest() çalıştır - sass çıktı dosyaları

        gulp.src(options.src + 'lib/styles/**/*.' + options.styleFile) // gulp.src() çalıştır - sass kaynak dosyaları
            .pipe(sourcemaps.init()) // sourcemaps.init() çalıştır
            .pipe(sass.sync().on('error', sass.logError)) // css çıktı dosyası
            .pipe(sourcemaps.write('./')) // sourcemaps.write() çalıştır
            .pipe(gulp.dest(options.dest + 'assets/css')); // gulp.dest() çalıştır - sass çıktı dosyaları
    /* ======= END CSS ======= */
    /* ======= END CSS ======= */
    /* ======= END CSS ======= */

    /* ======= JS ======= */
    /* ======= JS ======= */
    /* ======= JS ======= */
        gulp.src(options.src + 'lib/js/**/*.js')
            .pipe(sourcemaps.init()) // sourcemaps.init() çalıştır
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            // .pipe(concat('all.js'))
            // .pipe(uglify())
            .pipe(gulpif('!**/*.min.js', uglify({mangle: false})))
            .pipe(rename({ suffix: '.min' }))
            .pipe(sourcemaps.write('./')) // sourcemaps.write() çalıştır
            .pipe(gulp.dest(options.dest + 'assets/js'));

        gulp.src(options.src + 'lib/js/**/*.js')
            .pipe(sourcemaps.init()) // sourcemaps.init() çalıştır
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(sourcemaps.write('./')) // sourcemaps.write() çalıştır
            .pipe(gulp.dest(options.dest + 'assets/js'));
    /* ======= END JS ======= */
    /* ======= END JS ======= */
    /* ======= END JS ======= */

    /* ======= IMAGE ======= */
    /* ======= IMAGE ======= */
    /* ======= IMAGE ======= */
        gulp.src(options.src + 'lib/images/**/*.{jpg,png}')
            .pipe(imagemin())
            .pipe(gulp.dest(options.dest + 'assets/images'));

        gulp.src(options.dest + 'assets/images/**/*.{jpg, png}')
            .pipe(imagewebp())
            .pipe(gulp.dest(options.dest + 'assets/images'));
    /* ======= END IMAGE ======= */
    /* ======= END IMAGE ======= */
    /* ======= END IMAGE ======= */

    /* ======= INCLUDE AND COPY HTML ======= */
    /* ======= INCLUDE AND COPY HTML ======= */
    /* ======= INCLUDE AND COPY HTML ======= */
        gulp.src([
            options.src +'src/**/[!_]*.html'
        ])
            .pipe(fileinclude({
                prefix: '@',
                basepath: '@file'
            }))
            .pipe(gulp.dest(options.dest));
    /* ======= END INCLUDE AND COPY HTML ======= */
    /* ======= END INCLUDE AND COPY HTML ======= */
    /* ======= END INCLUDE AND COPY HTML ======= */

    /* ======= COPY VENDOR FOLDER ======= */
    /* ======= COPY VENDOR FOLDER ======= */
    /* ======= COPY VENDOR FOLDER ======= */
    gulp.src([options.src + 'lib/vendor/**/*'])
        .pipe(gulp.dest(options.dest+'vendor/'));
    /* ======= END COPY VENDOR FOLDER ======= */
    /* ======= END COPY VENDOR FOLDER ======= */
    /* ======= END COPY VENDOR FOLDER ======= */
}
/* ======= END COPY ASSETS AFTER BUILD ======= */

/**************************************************************************************/
/**************************************************************************************/
/**************************************************************************************/

/* ======= RELOAD SERVER ======= */
async function reload() {
    server.reload();
}
/* ======= END RELOAD SERVER ======= */

/* ======= BUILD PROJECT ======= */
async function buildAndReload() {
    await buildCodes();
    reload();
}
/* ======= END BUILD PROJECT ======= */

/* ======= WATCHING FILE UPDATES ======= */
function watch() {
    gulp.watch(
        [
            options.src + 'lib/styles/**/*.' + options.styleFile,
            options.src + 'lib/js/**/*.js',
            options.src + 'lib/images/**/*.{jpg,png}',
            options.src + 'src/**/*.html',
            options.src + 'lib/vendor/**/*'
        ],
        gulp.series(buildAndReload)
    );
}
/* ======= END WATCHING FILE UPDATES ======= */


/* ======= BUILD, SERVER AND WATCHING ======= */
export const build = gulp.series(buildAndReload);
export const serve = async function() {
  // Init serve files from the build folder
  server.init({
    server: {
      baseDir: options.dest
    }
  });
  // Build and reload at the first time
  buildAndReload();
  // Watch task
  watch();
};
/* ======= END BUILD, SERVER AND WATCHING ======= */

// EXPORT
export default serve
