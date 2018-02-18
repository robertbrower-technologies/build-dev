var buildPackage = function(package, packages, buildCallback, clean, install) {
    var pkg = packages[package];
    if (pkg.build) {
        console.log(`Building ${pkg.package.name}...`);
        if (pkg.package.dependencies) {
            var dependencies = Object.keys(pkg.package.dependencies);
            console.log(`Building ${pkg.package.name} dependencies...`);
            dependencies.forEach(dependency => {
                if (packages[dependency]) {
                    if (packages[dependency].build) {
                        buildPackage(dependency, packages, buildCallback, clean, install);
                    } else {
                        console.log(`Skipping ${dependency} because it is already built.`);
                    }
                }
            });
        }

        buildCallback(package, packages, clean, install);
    }
}

var exports = module.exports = {};
exports.buildPackage = buildPackage;