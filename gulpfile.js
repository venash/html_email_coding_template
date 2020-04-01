const path = require('path');
const fs = require('fs');
const {src, dest, watch, series} = require('gulp');
const color = require('gulp-color');
const replace = require("gulp-replace");
const clean = require('gulp-clean');
const pump = require('pump');
const sass = require('gulp-sass');
const pumpify = require('pumpify');
const fileinclude = require('gulp-file-include');


const freemarker = require("./tools/freemarker-tool");
const juiceTools = require('./tools/juice-tools');
const fileUtil = require('./util/file-util');

var browserSync = require("browser-sync").create();

const sourcesTemplateRoot = './src/templates/';
const sourcesStylesRoot = './src/scss/';
const sourcesHtmlPartsRoot = './src/parts/';

const develRoot = './_devel/';
const distRoot = './_dist/';

const templateSrc = [
    sourcesTemplateRoot + '**/*' + fileUtil.fileExtensionType.FTL,
    sourcesTemplateRoot + '**/*' + fileUtil.fileExtensionType.HTML,
];
const scssSrc = './**/*.scss';

const filesToWatch = [
    ...templateSrc,
    sourcesTemplateRoot + '*' + fileUtil.fileExtensionType.JSON,
    scssSrc,
    sourcesHtmlPartsRoot
];

let workingRoot = develRoot;

function styles(cb) {
    pump([
        src(sourcesStylesRoot + 'style.scss'),
        sass(),
        dest(sourcesTemplateRoot + 'styles')
    ], (err) => {
        if (err) console.log(err);
        if (cb) cb();
    });
}

function createWorkingRootDirectory() {
    if (!fs.existsSync(workingRoot)) {
        fs.mkdirSync(workingRoot);
    }
}

function cleanWorkingRoot(cb) {
    createWorkingRootDirectory();
    pump([
        src(workingRoot + '/*.*', {read: true}),
        clean()
    ], (err) => {
        if (err) console.log(err);
        if (cb) cb();
    });
}

/*
    This function do inline css processing using juice
    https://github.com/Automattic/juice
 */
function inlineCssStream(cb) {
    return pump(
        src(templateSrc),
        fileinclude({
            prefix: '@@',
            basepath: sourcesTemplateRoot
        }),
        juiceTools({
            applyAttributesTableElements: true,
            applyLinkTags: true,
            webResources: {
                images: false,
                relativeTo: path.resolve('./src/templates')
            }
        }),
        replace(/\<outlook-only-start\/\>/g, '<!--[if gte mso 9]>'),
        replace(/\<outlook-only-end\/\>/g, '<![endif]-->'),
        replace(/\<outlook-hide-start\/\>/g, '<![if !mso]>'),
        replace(/\<outlook-hide-end\/\>/g, '<![endif]>'),
        (err) => {
            if (err) console.log(err);
            if (cb) cb();
        });
}


/*
    This function run inlineCssStream and then java freemarker to passed template and fill data from json
    https://www.npmjs.com/package/freemarker
 */
function freemarkerStream() {
    return pump([
        inlineCssStream(),
        freemarker({
            dirname: sourcesTemplateRoot,
            options: {}
        })
    ]);
}

/*
    Run develop server to build html
 */
function develHtml(cb) {

    cleanWorkingRoot(cb);

    browserSync.init({
        server: workingRoot,
        port: 8080,
        baseDir: workingRoot,
        directory: true,
        watchOptions: {
            ignoreInitial: false,
        },
    });

    watch(
        filesToWatch,
        {
            ignoreInitial: false
        },
        series(
            cleanWorkingRoot,
            styles,
            function (cb) {
                pump([
                    inlineCssStream(),
                    fileUtil.renameExtension(fileUtil.fileExtensionType.HTML),
                    dest(workingRoot)
                ], cb).on('finish', function () {
                    browserSync.reload("*.html");
                });
            }
        ),
        cb
    );
    cb();
}

/*
    Run develop server to build html and process freemarker
 */
function develFreemarker(cb) {

    cleanWorkingRoot();

    browserSync.init({
        server: workingRoot,
        port: 8080,
        baseDir: workingRoot,
        directory: true,
    });

    watch(
        filesToWatch,
        {
            ignoreInitial: false
        },
        series(
            cleanWorkingRoot,
            styles,
            function (cb) {
                pump([
                    freemarkerStream(),
                    fileUtil.renameExtension(fileUtil.fileExtensionType.HTML),
                    dest(workingRoot)
                ], cb).on('finish', function () {
                    browserSync.reload("*.html");
                });
            }
        )
    );

    cb();
}

function build(cb) {
    workingRoot = distRoot;
    cleanWorkingRoot();
    styles();
    pump(
        inlineCssStream(),
        dest(workingRoot),
        cb
    )
}

function buildFreemarker(cb) {
    workingRoot = distRoot;
    cleanWorkingRoot();
    styles();
    pump(
        freemarkerStream(),
        fileUtil.renameExtension(fileUtil.fileExtensionType.FTL),
        dest(workingRoot),
        cb
    );
}

function info(cb) {
    console.log('\n');
    console.log(color('Hi, you are trying to run HTML email genereting tool. You can use this commands:', 'MAGENTA'));

    console.log('\n');
    cb();
}

exports.default = info;

exports['build'] = build;
exports['build-freemarker'] = buildFreemarker;

exports['devel-html'] = develHtml;
exports['devel-freemarker'] = develFreemarker;
