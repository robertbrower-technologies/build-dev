var runBuildMenu = function(packages, buildAllCallback, buildPackageCallback, clean, install, publish) {
    var width = process.stdout.columns - 4;
    var menu = require('terminal-menu')({width: width, x: 0, y: 0});
    menu.reset();
    menu.write('SELECT BUILD TARGET\n');
    menu.write(new Array(width).join('-') + '\n');
    Object.keys(packages).forEach(pkg => menu.add(`${pkg}`));
    menu.write(new Array(width).join('-') + '\n');
    menu.add('BUILD ALL');
    menu.write(new Array(width).join('-') + '\n');
    menu.add('EXIT');
    menu.on('select', function (label) {
        if (label == 'EXIT') {
            menu.close();
            process.exit(0);
        } else if (label == 'BUILD ALL') {
            menu.close();
            buildAllCallback(packages, clean, install, publish);
        } else {
            menu.close();
            buildPackageCallback(label, packages, clean, install, publish);
        }
    });
    process.stdin.pipe(menu.createStream()).pipe(process.stdout);
    process.stdin.setRawMode(true);
    menu.on('close', function () {
        process.stdin.setRawMode(false);
        process.stdin.end();
    });
}

var exports = module.exports = {};
exports.runBuildMenu = runBuildMenu;