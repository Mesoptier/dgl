var gulp = require("gulp");
var gutil = require("gulp-util");
var peg = require("gulp-peg");
var babel = require("gulp-babel");
var insert = require("gulp-insert");
var del = require("del");

gulp.task("build", ["build:peg", "build:es5"]);

gulp.task("build:peg", ["clean:build"], function () {
  return gulp.src("src/*.pegjs")
    .pipe(peg().on("error", gutil.log))
    .pipe(gulp.dest("build/"));
});

gulp.task("build:es5", ["clean:es5"], function () {
  return gulp.src("src/*.js")
    .pipe(insert.prepend("var regeneratorRuntime = require('regenerator-runtime-only');\n"))
    .pipe(babel())
    .pipe(gulp.dest("es5/"));
});

gulp.task("clean:build", function (done) {
  del("build/", done);
});

gulp.task("clean:es5", function (done) {
  del("es5/", done);
});