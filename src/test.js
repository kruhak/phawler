var system = require('system');



var args = require('../node_modules/minimist/index.js')(system.args);

if (args.h) {
  var help = `
    Phawler. Module based crawling tool working on PhantomJS.

    Usage:  phawler <site_url> <options>

    Options:

    -h, --help        Display help information
    -c, --config      Path to configuration file
    -m, --modules     Comma separeted modules list
    -v, --verbose     Display verbose information during crawler process

    Author: Sergey Sergin <sergey-sergin@kruhak.name>
    More information: <github>
 `;

  console.log(help);
}

phantom.exit();