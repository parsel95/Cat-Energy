const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sass = require("gulp-dart-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const browser = require("browser-sync").create();
const htmlmin = require("gulp-htmlmin");

// Styles

export const styles = () => {
  return gulp.src("source/sass/style.scss", { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css', { sourcemaps: "." }))
    .pipe(browser.stream());
}

exports.styles = styles;

// HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

exports.html = html;

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch('source/*.html').on("change", browser.reload);
}


exports.default = gulp.series(
  styles, html, server, watcher
);
