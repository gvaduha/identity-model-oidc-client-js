// webpack 4 hashes with md4 (some of it hardcoded), which OpenSSL 3 (Node >= 17)
// rejects with "error:0308010C:digital envelope routines::unsupported".
// Hashes are only used for build caching/ids, so sha256 is a safe drop-in.
var crypto = require('crypto');
var originalCreateHash = crypto.createHash;
crypto.createHash = function (algorithm, options) {
  return originalCreateHash.call(crypto, algorithm === 'md4' ? 'sha256' : algorithm, options);
};

// create a webpack configuration with all common parts included here
function createWebpackConfig(options) {
  return {
    mode: options.mode,
    entry: options.entry,
    output: options.output,
    plugins: options.plugins,
    node: {
      // crypto-js probes require('crypto') for Node; browsers use window.crypto,
      // so don't let webpack bundle the crypto-browserify polyfill
      crypto: 'empty',
      buffer: 'empty'
    },
    module: {
      rules: [
        {
          test: /.js$/,
          loaders: ['babel-loader'],
          exclude: /node_modules/,
          include: __dirname
        }
      ]
    },
    // this is for the sourcemaps
    devtool: options.devtool,
    optimization: options.optimization
  };
}

module.exports = createWebpackConfig;
