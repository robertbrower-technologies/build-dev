var findPackages = require('./find-packages').findPackages;
var loadPackages = require('./load-packages').loadPackages;
var runBuildMenu = require('./run-build-menu').runBuildMenu;
var buildPackage = require('./build-package').buildPackage;
var buildCallback = require('./build-callback').buildCallback;

// HANDLE COMMAND LINE ARGS
var package = undefined;
var buildAll = false;
var clean = undefined;
var install = false;
var publish = false;
process.argv.forEach(function (val, index, array) {
    var prefix = '-package=';
    if (val.toLowerCase().startsWith(prefix)) {
        package = val.substr(val.indexOf('=') + 1, val.length - prefix.length);
    }
    if (val.toLowerCase() == '-build-all') {
        buildAll = true;
    }
    prefix = '-clean=';
    if (val.toLowerCase().startsWith(prefix)) {
        clean = val.substr(val.indexOf('=') + 1, val.length - prefix.length);
    }
    if (val.toLowerCase() == '-install') {
        install = true;
    }
    if (val.toLowerCase() == '-publish') {
        publish = true;
    }
    if (val.toLowerCase() == '-help') {
        console.log(`options:
    -package=sample-package (optional, builds sample-package and it\'s dependencies)
    -build-all (optional, builds all packages)
    -clean=node_modules (optional, deletes the node_modules folder before installing)
    -install (optional, executes: npm install before compiling)
    -publish (optional, executes: npm publish in the dist folder)`);
        process.exit(0);
    }
});

// FIND PACKAGES
console.log('Finding packages...');
var fileList = [];
findPackages(__dirname, fileList);

// LOAD PACKAGES
console.log(`Loading ${fileList.length} packages...`);
var packages = {};
packages = loadPackages(fileList, packages);

// BUILD ALL CALLBACK
var buildAllCallback = function(packages, clean, install, publish) {
    Object.keys(packages).forEach(package => buildPackage(package, packages, buildCallback, clean, install, publish));
    console.log('Build completed successfully.');
}

// BUILD PACKAGE CALLBACK
var buildPackageCallback = function(package, packages, clean, install, publish) {
    buildPackage(package, packages, buildCallback, clean, install, publish);
    console.log('Build completed successfully.');
}

if (buildAll) {
    console.log('Building all packages...');
    buildAllCallback(packages, clean, install, publish);
}
else if (package) {
    buildPackageCallback(package, packages, clean, install, publish);
} else {
    runBuildMenu(packages, buildAllCallback, buildPackageCallback, clean, install, publish);
}
