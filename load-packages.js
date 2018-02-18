var loadPackages = function(filelist, packages) {
    filelist.forEach(file => {
        console.log(`Loading ${file}...`);
        var package = require(file);
        packages[package.name] = {
            package: package,
            file: file,
            build: true
        };
    });

    return packages;
};

var exports = module.exports = {};
exports.loadPackages = loadPackages;