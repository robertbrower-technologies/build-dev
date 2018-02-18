var directory = function(file) {
    return file.substring(0, file.lastIndexOf("\\") + 1);
}

var exports = module.exports = {};
exports.directory = directory;