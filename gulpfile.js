var package = require('./package.json');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var createWebpackConfig = require('./webpack.base');
var TerserPlugin = require('terser-webpack-plugin');

// entry points for both configs
var npmEntry ='./index.js';
var classicEntry = ['babel-polyfill', npmEntry];

const optimization = {
  minimizer: [new TerserPlugin({
    extractComments: false,
    terserOptions: {
      compress: {
          keep_fnames: true
      }
    }
  })]
};

// NOTE: jsrsasign has been removed. JoseUtil now uses WebCrypto + crypto-js,
// so the separate "rsa256" variants (JoseUtilRsa swap) are no longer needed.
// They are still emitted under their old file names, built from the same code,
// so any consumer referencing oidc-client.rsa256*.js keeps working.

function libBuild(filename, mode) {
  var conf = {
    mode: mode,
    entry: npmEntry,
    output: {
        filename: filename,
        libraryTarget:'umd',
        // Workaround for https://github.com/webpack/webpack/issues/6642
        globalObject: 'this'
    },
    plugins: []
  };
  if (mode === 'production') {
    conf.devtool = false;
    conf.optimization = optimization;
  } else {
    conf.devtool = 'inline-source-map';
  }
  return gulp.src('index.js')
    .pipe(webpackStream(createWebpackConfig(conf), webpack))
    .pipe(gulp.dest('lib/'));
}

function distBuild(entry, filename, mode) {
  var conf = {
    mode: mode,
    entry: entry,
    output: {
        filename: filename,
        libraryTarget:'var',
        library:'Oidc'
    },
    plugins: []
  };
  if (mode === 'production') {
    conf.devtool = false;
    conf.optimization = optimization;
  } else {
    conf.devtool = 'inline-source-map';
  }
  return gulp.src('index.js')
    .pipe(webpackStream(createWebpackConfig(conf), webpack))
    .pipe(gulp.dest('dist/'));
}

var slimEntry = ['./polyfills.js', './index.js'];

function build_lib_sourcemap()      { return libBuild('oidc-client.js', 'development'); }
function build_lib_min()            { return libBuild('oidc-client.min.js', 'production'); }
function build_lib_rsa_sourcemap()  { return libBuild('oidc-client.rsa256.js', 'development'); }
function build_lib_rsa_min()        { return libBuild('oidc-client.rsa256.min.js', 'production'); }

function build_dist_sourcemap()          { return distBuild(classicEntry, 'oidc-client.js', 'development'); }
function build_dist_min()                { return distBuild(classicEntry, 'oidc-client.min.js', 'production'); }
function build_dist_slim_sourcemap()     { return distBuild(slimEntry, 'oidc-client.slim.js', 'development'); }
function build_dist_slim()               { return distBuild(slimEntry, 'oidc-client.slim.min.js', 'production'); }
function build_dist_slim_rsa_sourcemap() { return distBuild(slimEntry, 'oidc-client.rsa256.slim.js', 'development'); }
function build_dist_slim_rsa()           { return distBuild(slimEntry, 'oidc-client.rsa256.slim.min.js', 'production'); }

function add_version(){
    var stream = source('./version.js');
    stream.end('const Version = "' + package.version + '"; export {Version};');
    return stream.pipe(gulp.dest('./'));
}

function copy_ts(){
  return gulp.src('./index.d.ts')
      .pipe(rename('oidc-client.d.ts'))
      .pipe(gulp.dest('./dist/'));
}

// putting it all together
exports.default = gulp.series(
  add_version,
  gulp.parallel(
    build_lib_sourcemap,
    build_lib_min,

    build_lib_rsa_sourcemap,
    build_lib_rsa_min,

    build_dist_sourcemap,
    build_dist_min,

    build_dist_slim_sourcemap,
    build_dist_slim,

    build_dist_slim_rsa_sourcemap,
    build_dist_slim_rsa
  ),
  copy_ts
);
