var directory = require('./directory').directory;
var execSync = require('child_process').execSync;
var rimrafSync = require('rimraf').sync;

var buildCallback = function(package, packages, clean, install) {
    var dir = directory(packages[package].file);
    console.log(`Changing to directory ${dir}...`);
    process.chdir(dir);

    if (clean) {
        dir = `${dir}\\node_modules`;
        console.log(`Deleting directory ${dir}...`);
        rimrafSync(dir);
    }

    if (install) {
        console.log('Installing packages...');
        execSync('npm install', {stdio:[0,1,2]});
    }
    
    console.log(`Compiling ${packages[package].package.name}`);
    execSync('npm run build', {stdio:[0,1,2]});

    packages[package].build = false;
}

var exports = module.exports = {};
exports.buildCallback = buildCallback;