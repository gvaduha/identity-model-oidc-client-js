// Builds the same bundles the original gulp/webpack 4 pipeline produced:
//   lib/  - UMD (npm "main"), with and without minification
//   dist/ - classic browser globals (var Oidc), full polyfills or "slim" core-js set
// The *.rsa256* files are kept for compatibility; since jsrsasign was removed
// they are built from the same code as the regular bundles.

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const npmEntry = './index.js';
// Replaces babel-polyfill (core-js 2 + regenerator) of the old classic build
const classicEntry = ['core-js/stable', 'regenerator-runtime/runtime', npmEntry];
const slimEntry = ['./polyfills.js', npmEntry];

function config({ entry, filename, dir, library, minify }) {
    return {
        mode: minify ? 'production' : 'development',
        // keep the ES5 output (and ES5 webpack runtime) of the original builds
        target: ['web', 'es5'],
        entry,
        output: {
            path: path.resolve(__dirname, dir),
            filename,
            library,
            // index.js has a single default export; expose it directly as before
            // (Oidc.UserManager / require('oidc-client').UserManager)
            globalObject: 'this',
            clean: false
        },
        devtool: minify ? false : 'inline-source-map',
        resolve: {
            // crypto-js probes require('crypto') for Node; browsers use window.crypto
            fallback: { crypto: false }
        },
        module: {
            rules: [{
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'index.js'),
                    path.resolve(__dirname, 'version.js'), path.resolve(__dirname, 'polyfills.js')],
                use: 'babel-loader'
            }]
        },
        optimization: minify ? {
            minimize: true,
            minimizer: [new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    ecma: 5,
                    compress: { keep_fnames: true }
                }
            })]
        } : { minimize: false },
        performance: { hints: false },
        stats: 'errors-warnings'
    };
}

const umd = { type: 'umd', export: 'default' };
const classic = { name: 'Oidc', type: 'var', export: 'default' };

module.exports = [
    config({ entry: npmEntry, filename: 'oidc-client.js', dir: 'lib', library: umd }),
    config({ entry: npmEntry, filename: 'oidc-client.min.js', dir: 'lib', library: umd, minify: true }),
    config({ entry: npmEntry, filename: 'oidc-client.rsa256.js', dir: 'lib', library: umd }),
    config({ entry: npmEntry, filename: 'oidc-client.rsa256.min.js', dir: 'lib', library: umd, minify: true }),

    config({ entry: classicEntry, filename: 'oidc-client.js', dir: 'dist', library: classic }),
    config({ entry: classicEntry, filename: 'oidc-client.min.js', dir: 'dist', library: classic, minify: true }),
    config({ entry: slimEntry, filename: 'oidc-client.slim.js', dir: 'dist', library: classic }),
    config({ entry: slimEntry, filename: 'oidc-client.slim.min.js', dir: 'dist', library: classic, minify: true }),
    config({ entry: slimEntry, filename: 'oidc-client.rsa256.slim.js', dir: 'dist', library: classic }),
    config({ entry: slimEntry, filename: 'oidc-client.rsa256.slim.min.js', dir: 'dist', library: classic, minify: true })
];
