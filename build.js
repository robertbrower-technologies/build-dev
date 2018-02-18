var findPackages = require('./find-packages').findPackages;
var loadPackages = require('./load-packages').loadPackages;
var runBuildMenu = require('./run-build-menu').runBuildMenu;
var buildPackage = require('./build-package').buildPackage;
var buildCallback = require('./build-callback').buildCallback;

// HANDLE COMMAND LINE ARGS
var package = undefined;
var buildAll = false;
var clean = false;
var install = false;
process.argv.forEach(function (val, index, array) {
    var prefix = '-package=';
    if (val.toLowerCase().startsWith(prefix)) {
        package = val.substr(val.indexOf('=') + 1, val.length - prefix.length);
    }
    if (val.toLowerCase() == '-build-all') {
        buildAll = true;
    }
    if (val.toLowerCase() == '-clean') {
        clean = true;
    }
    if (val.toLowerCase() == '-install') {
        install = true;
    }
    if (val.toLowerCase() == '-help') {
        console.log(`usage: node build -clean -install`);
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

// BUILD ALL
var buildAllCallback = function(packages) {
    Object.keys(packages).forEach(package => buildPackage(package, packages, buildCallback, clean, install));
}

// BUILD PACKAGE
var buildPackageCallback = function(package, packages, clean, install) {
    buildPackage(package, packages, buildCallback, clean, install);
    console.log('Build completed successfully.');
}

if (buildAll) {
    console.log('Building all packages...');
    buildAllCallback(packages, clean, install);
}
else if (package) {
    buildPackageCallback(package, packages, clean, install);
} else {
    runBuildMenu(packages, buildAllCallback, buildPackageCallback, clean, install);
}
