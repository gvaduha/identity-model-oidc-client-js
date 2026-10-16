// Replaces the gulp pipeline: writes version.js, runs all webpack builds,
// and copies the TypeScript definitions into dist/.

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

fs.writeFileSync(path.join(__dirname, 'version.js'),
    'const Version = "' + pkg.version + '"; export {Version};\n');

webpack(require('./webpack.config.js'), (err, stats) => {
    if (err) {
        console.error(err.stack || err);
        process.exit(1);
    }
    const info = stats.toString({ colors: false, preset: 'errors-warnings' });
    if (info.trim()) {
        console.log(info);
    }
    if (stats.hasErrors()) {
        process.exit(1);
    }

    fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
    fs.copyFileSync(path.join(__dirname, 'index.d.ts'), path.join(__dirname, 'dist', 'oidc-client.d.ts'));

    for (const dir of ['lib', 'dist']) {
        for (const f of fs.readdirSync(path.join(__dirname, dir)).sort()) {
            const size = fs.statSync(path.join(__dirname, dir, f)).size;
            console.log(dir + '/' + f + '\t' + Math.round(size / 1024) + ' KB');
        }
    }
});
