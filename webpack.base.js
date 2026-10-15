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
