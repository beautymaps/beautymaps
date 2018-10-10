var gulp = require('gulp');
var appconfig = require('./appconfig.json');
var replace = require('gulp-replace');
var rename = require('gulp-rename');

gulp.task('create-config', function makeConfig() { 
    return gulp.src('./template/bmconfig.module.template')
        .pipe(replace('REPLACE_CONSTANTS', JSON.stringify(appconfig.prod.BM_CONSTANTS)))
        .pipe(rename('bmconfig.module.ts'))
        .pipe(gulp.dest('src/app/bmconfig'))
})

