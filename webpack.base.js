// create a webpack configuration with all common parts included here
function createWebpackConfig(options) {
  return {
    mode: options.mode,
    entry: options.entry,
    // webpack 4 defaults to md4, which OpenSSL 3 (Node >= 17) rejects
    // with ERR_OSSL_EVP_UNSUPPORTED; sha256 works on every Node version
    output: Object.assign({ hashFunction: 'sha256' }, options.output),
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
