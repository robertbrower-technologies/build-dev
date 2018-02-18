var directory = require('./directory').directory;
var execSync = require('child_process').execSync;
var rimrafSync = require('rimraf').sync;

var buildCallback = function(package, packages, clean, install, publish) {
    var dir = directory(packages[package].file);
    console.log(`Changing to directory ${dir}`);
    process.chdir(dir);

    if (clean && clean.length > 0) {
        var cleandir = `${dir}${clean}`;
        console.log(`Deleting directory ${cleandir}...`);
        rimrafSync(cleandir);
    }
    
    if (install) {
        console.log(`Installing packages...`);
        execSync('npm install', {stdio:[0,1,2]});
    }
            
    console.log(`Compiling ${packages[package].package.name}...`);
    execSync('npm run build', {stdio:[0,1,2]});

    if (packages[package].package.private != true && publish) {
        var dist = `${dir}\\dist`;
        console.log(`Changing to directory ${dist}`);
        process.chdir(dir);
        console.log(`Publishing ${package}...`);
        execSync('npm publish', {stdio:[0,1,2]});
    }

    packages[package].build = false;
}

var exports = module.exports = {};
exports.buildCallback = buildCallback;