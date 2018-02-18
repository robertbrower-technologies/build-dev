var findPackages = function(dir, filelist) {
    var path = path || require('path');
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        var f = path.join(dir, file);
        if (fs.statSync(f).isDirectory()) {

            var ignore =
                f.includes('\\.git') ||
                f.includes('\\node_modules') ||
                f.includes('\\src') ||
                f.includes('\\playground') ||
                f.includes('\\tools') ||
                f.includes('\\e2e') ||
                f.includes('\\dist') ||
                f == __dirname + '\\package.json'

            if (!ignore) {
                filelist = findPackages(f, filelist);
            }
        }
        else {
            if (f != __dirname + '\\package.json' && f.endsWith('package.json')) {
                filelist.push(f);
            }
        }
    });
    return filelist;
};

var exports = module.exports = {};
exports.findPackages = findPackages;