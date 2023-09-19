import gulp from "gulp";
import plumber from "gulp-plumber";
import sourcemap from "gulp-sourcemaps";
import sass from "gulp-dart-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import htmlmin from "gulp-htmlmin";
import csso from "postcss-csso";
import rename from "gulp-rename";
import terser from "gulp-terser";
import imagemin from 'gulp-imagemin';
import webp from "gulp-webp";
import svgstore from"gulp-svgstore";
import inject from "gulp-inject";
import { deleteAsync } from 'del';
import browser from "browser-sync";

// Styles

export const styles = (done) => {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(browser.stream());
  done();
}

// HTML

export const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

// Scripts

export const scripts = () => {
  return gulp.src("source/js/app.js")
    .pipe(terser())
    .pipe(rename("app.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(browser.stream());
}

// Images

export const optmizeImages = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin())
    .pipe(gulp.dest("build/img"));
}

export const copyImages = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(gulp.dest("build/img"));
}

// Webp

export const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
}

// Sprite

export const spriteFile = () => {
  return gulp.src("source/img/iconsForSprite/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
}

export const spriteInline = () => {
  const svgs = gulp
    .src('source/img/iconsForSpriteInline/*.svg')
    .pipe(svgstore({ inlineSvg: true }));

  function fileContents (filePath, file) {
    return file.contents.toString();
  }

  return gulp.src(["source/index.html", "source/catalog.html", "source/form.html"])
    .pipe(inject(svgs, { transform: fileContents }))
    .pipe(gulp.dest("source"));
}

// Copy

export const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/img/**/*.svg",
    "source/manifest.webmanifest",
    "!source/img/iconsForSprite/*.svg",
    "!source/img/iconsForSpriteInline/*.svg"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

// Clean

export const clean = () => {
  return deleteAsync("build");
}

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

// Reload

const reload = (done) => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/js/script.js", gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html)).on("change", browser.reload);
}

// Build

export const build = gulp.series(
  clean,
  copy,
  optmizeImages,
  spriteInline,
  gulp.parallel(
    styles,
    html,
    scripts,
    spriteFile,
    createWebp
  ),
);

// Default

export default gulp.series(
  clean,
  copy,
  copyImages,
  spriteInline,
  gulp.parallel(
    styles,
    html,
    scripts,
    spriteFile,
    createWebp
  ),
  gulp.series(
    server,
    watcher
));

