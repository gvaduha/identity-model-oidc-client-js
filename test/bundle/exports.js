// Verifies the built bundles expose the same API shape as the original 1.11.5 builds:
// lib/*  -> UMD, module.exports is the API object (require('oidc-client').UserManager)
// dist/* -> classic script defining a global `Oidc`
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const acorn = require('acorn');

const root = path.join(__dirname, '..', '..');

const expected = ['Version', 'Log', 'OidcClient', 'OidcClientSettings', 'WebStorageStateStore',
    'InMemoryWebStorage', 'UserManager', 'AccessTokenEvents', 'MetadataService',
    'CordovaPopupNavigator', 'CordovaIFrameNavigator', 'CheckSessionIFrame',
    'TokenRevocationClient', 'SessionMonitor', 'Global', 'User'];

// The original builds targeted ES5 (IE11); make sure that still holds
function checkEs5(file) {
    try {
        acorn.parse(fs.readFileSync(file, 'utf8'), { ecmaVersion: 5 });
    }
    catch (e) {
        throw new Error(path.relative(root, file) + ' is not ES5: ' + e.message);
    }
}

function check(name, api) {
    const missing = expected.filter(k => !api || api[k] === undefined);
    if (missing.length) {
        throw new Error(name + ' is missing exports: ' + missing.join(', '));
    }
    if (api.default !== undefined) {
        throw new Error(name + ' unexpectedly exposes a "default" wrapper');
    }
    console.log('ok  ' + name + ' (Version ' + api.Version + ')');
}

for (const f of fs.readdirSync(path.join(root, 'lib'))) {
    checkEs5(path.join(root, 'lib', f));
    check('lib/' + f, require(path.join(root, 'lib', f)));
}
for (const f of fs.readdirSync(path.join(root, 'dist')).filter(f => f.endsWith('.js'))) {
    checkEs5(path.join(root, 'dist', f));
    const sandbox = { window: {}, navigator: {}, location: { protocol: 'https:', host: 'example.test', href: 'https://example.test/' } };
    sandbox.window = sandbox;
    vm.createContext(sandbox);
    vm.runInContext(fs.readFileSync(path.join(root, 'dist', f), 'utf8'), sandbox, { filename: f });
    check('dist/' + f, vm.runInContext('typeof Oidc !== "undefined" ? Oidc : undefined', sandbox));
}
