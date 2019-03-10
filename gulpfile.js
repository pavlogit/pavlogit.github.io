'use strict';

const gulp = require('gulp');
const browsersync = require('browser-sync');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const cssmin = require("gulp-minify-css");

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./src/"
    },
    port: 3000
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function css() {
  return gulp
      .src("./src/scss/*.scss")
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer({browsers: ["ie >= 10", "opera 12.1", "> 2%", "last 2 versions"]}))
      .pipe(concat("style.css"))
      .pipe(cssmin())
      .pipe(rename({ suffix: ".min" }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("./src/css"));
}

function watchFiles() {
  gulp.watch("./src/scss/*", gulp.series(css, browserSyncReload));
  gulp.watch("./src/index.html", browserSyncReload);
}

const build = gulp.parallel(css, watchFiles, browserSync);

exports.build = build;
exports.default = build;
