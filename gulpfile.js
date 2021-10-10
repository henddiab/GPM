////////////////////////////////////////////////////
//////////// this script written by Ahmed Saeed
/////////// Email: mr.ahmedsaeed1@gmail.com
////////////// tel: 01067258000
////////////////////////////////////////////////////

// to gererate poduction build
// run in command " export NODE_ENV=production " then
// run gulp

// for windows user run in command "echo NODE_ENV=production" then
// run gulp

var
    gulp = require('gulp'),
    htmlClean = require('gulp-htmlclean'),
    imacss = require('gulp-imacss'),
    imagemin = require('gulp-imagemin'),
    newer = require('gulp-newer'),
    size = require('gulp-size'),
    compass = require('gulp-compass'),

    browserify = require('browserify'),
    babelify = require('babelify'),
    vinylSource = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),

    jshint = require('gulp-jshint'),
    cleancss = require('gulp-clean-css'),
    rtlcss = require('gulp-rtlcss'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    stripdebug = require('gulp-strip-debug'),
    sourcemaps = require('gulp-sourcemaps'),
    nunjucksRender = require('gulp-nunjucks-render'),
    browsersync = require('browser-sync'),
    del = require('del'),
    pkg = require('./package.json');


var
    devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production'),

    source = 'dev/',
    dest = 'build/',

    syncOpts = {
        server: {
            baseDir: dest,
            index: 'index.html'
        },
        open: true,
        notify: true
    },

    nunjucks = {
        templates: source + 'templates/',
        pages: source + 'pages/',
        watch: [source + 'templates/' + '/**/*.+(html|js|css)', source + 'pages/' + '/**/*.+(html|js|css)'],
        out: dest
    },

    images = { in: source + 'images/**/*',
        out: dest + 'images/'
    },

    imguri = { in: source + 'images/inline/*',
        out: source + 'sass/images/',
        filename: '_datauri.scss',
        namespace: 'images'
    },

    css = { in: source + 'sass/style.scss',
        watch: [source + 'sass/**/*', '!' + imguri.out + imguri.filename],
        out: dest + 'css/',
        compassOpts: {
            sass: source + 'sass',
            image: 'images',
            fonts: 'fonts',
            js: 'js',
            style: 'expanded',
            sourcemap: true,
            css: dest + 'css',
            require: ['susy', 'breakpoint']
        }
    },

    fonts = { in: source + 'fonts/**/*',
        out: dest + 'fonts/'
    },

    js = { in: [
            source + 'scripts/popper.js',
            source + 'scripts/bootstrap.js',
            source + 'scripts/select2.js',

            source + 'scripts/calendar/jquery.calendars.js', //datepicker
            source + 'scripts/calendar/jquery.calendars.plus.js', //datepicker
            source + 'scripts/calendar/jquery.plugin.js', //datepicker
            source + 'scripts/calendar/jquery.calendars.picker.js', //datepicker
            source + 'scripts/calendar/jquery.calendars.islamic.js', //datepicker
            source + 'scripts/calendar/jquery.calendars.islamic-ar.js', //datepicker

            source + 'scripts/highcharts/proj4.js',
            source + 'scripts/highcharts/highcharts.js',
            source + 'scripts/highcharts/drilldown.js',
            source + 'scripts/highcharts/variable-pie.js',

            source + 'scripts/jquery-simple-tree-table.js', // treetable
            source + 'scripts/charts.js', // charts
            source + 'scripts/jquery.gre.js', // text editor
            source + 'scripts/jquery.multi-select.js', //multiselect

            source + 'scripts/bootstrap-clockpicker.js', //timepicker

            source + 'scripts/jquery-ui.js', //duration spinner
            source + 'scripts/moment.js', //duration spinner
            source + 'scripts/jquery-ui-timespinner.js', //duration spinner

            source + 'scripts/main.js', //calendar
            source + 'scripts/locales-all.js', //calendar

            source + 'scripts/script.js'
        ],
        out: dest + 'js/',
        watch: source + 'scripts/**/*.js',
        filename: 'script.js'
    };

// js = {
// 	in: [
// 		source + 'js/app.js'
// 	],
// 	out: dest + 'js/',
// 	watch: source + 'js/**/*.js',
// 	filename: 'app.js'
// };

console.log(pkg.name + ' ' + pkg.version + ', ' + (devBuild ? 'Development' : 'Production') + ' Build');


/// nunjucks task
gulp.task('nunjucks', function() {
    return gulp.src(nunjucks.pages + '/**/*.+(html|js|css)')
        .pipe(nunjucksRender({
            path: [nunjucks.templates],
            data: {
                devBuild: devBuild,
                author: pkg.author,
                version: pkg.version
            }
        }))
        .pipe(gulp.dest(nunjucks.out));
});

//// images copy to build
gulp.task('images', function() {
    return gulp.src(images.in)
        .pipe(imagemin())
        .pipe(gulp.dest(images.out));
});

/// imguri
gulp.task('imacss', function() {
    return gulp.src(imguri.in)
        .pipe(newer(images.out))
        .pipe(imagemin())
        .pipe(gulp.dest(imguri.out));
});

/// css with sass and pleeease tasks
gulp.task('sass', ['imacss'], function() {
    return gulp.src(css.in)
        //.pipe(sass(css.sassOpts))
        .pipe(compass(css.compassOpts))
        .pipe(gulp.dest(css.out))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleancss())
        .pipe(gulp.dest(css.out))
        .pipe(browsersync.reload({ stream: true }));
});

// css with sass and pleeease tasks
gulp.task('sass-reverse', ['imacss'], function() {
    return gulp.src(css.in)
        //.pipe(sass(css.sassOpts))
        .pipe(compass(css.compassOpts))
        .pipe(rtlcss())
        .pipe(rename({ suffix: '-reverse' }))
        .pipe(gulp.dest(css.out))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleancss())
        .pipe(gulp.dest(css.out))
        .pipe(browsersync.reload({ stream: true }));
});

///// js task

gulp.task('js', function() {
    return gulp.src(js.in)
        //.pipe(newer(js.out))
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'))

    .pipe(concat(js.filename))
        .pipe(gulp.dest(js.out))
        .pipe(size({ title: 'js before...' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(stripdebug())
        .pipe(uglify())
        .pipe(size({ title: 'js after...' }))
        .pipe(gulp.dest(js.out));
});

// gulp.task('js', function(){
// 	js.in.map(function(entry){
// 		return browserify({
// 			entries: [entry]
// 		})
// 		.transform( babelify, {presets: ['babel-preset-es2015']} )
// 		.bundle()
// 		.pipe( vinylSource(entry) )
// 		.pipe( rename({extname: ".min.js"}) )
// 		.pipe( buffer() ) 
// 		.pipe( sourcemaps.init({ loadMaps: true }) )
// 		.pipe( uglify() )
// 		.pipe( sourcemaps.write('./') )
// 		.pipe(size({title: 'js after...'}))
// 		.pipe(gulp.dest(js.out))
// 	})
// });


///// fonts task
gulp.task('fonts', function() {
    return gulp.src(fonts.in)
        .pipe(newer(fonts.out))
        .pipe(gulp.dest(fonts.out));
});

// copy jquery to dest
gulp.task('jquery', function() {
    return gulp.src(source + 'scripts/jquery-3.6.0.min.js')
        .pipe(newer(dest + 'js/'))
        .pipe(gulp.dest(dest + 'js/'));
});

/// sync
gulp.task('browsersync', function() {
    browsersync(syncOpts);
});

// default task
gulp.task('default', ['nunjucks', 'jquery', 'js', 'fonts', 'sass', 'images', 'browsersync', 'sass-reverse'],
    function() {

        gulp.watch(nunjucks.watch, ['nunjucks', browsersync.reload]);

        gulp.watch(images.in, ['images']);

        gulp.watch(js.in, ['js', browsersync.reload]);

        gulp.watch([css.watch, imguri.in], ['sass']);

        gulp.watch(fonts.in, ['fonts']);

    });