var gulp = require("gulp");
var exec = require("gulp-exec");
var nodemon = require("nodemon");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");

gulp.task("sass", function() {
  return gulp.src(["public_html/scss/*.scss"])
      .pipe(sass())
       //the css desctination is in the css folder
      .pipe(gulp.dest("public_html/public/css"))
      .pipe(browserSync.stream());
});

gulp.task("serve", ["nodemon"], function() {
  //proxy serves what's in the express node server
  browserSync.init(null, {
        proxy: "http://localhost:3002", // port of node server
  });
});

gulp.task("nodemon", function (cb) {
    var cbCalled = false;
    return nodemon({script: "./public_html/server.js"}).on("start", function (){
        if (!cbCalled) {
          cbCalled = true;
          cb();
          console.info("Nodemon callback called successfully");
        }
    });
});

gulp.task("default", ["serve"]);
