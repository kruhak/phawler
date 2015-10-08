#!/usr/bin/phantomjs

import system from 'system';

import Crawler from './crawler.js'
import http from './modules/http.js';
import screenshot from './modules/screenshot.js';
import status from './modules/status.js';
import scaled from './modules/scaled.js';
import bigfiles from './modules/bigfiles.js';

import minimist from '../node_modules/minimist/index.js';

var args = minimist(system.args, {
  alias: {
    url: 'u',
    list: 'l',
    report: 'r',
    config: 'c',
    modules: 'm',
    verbose: 'v',
    help: 'h'
  }
});

if (Object.keys(args).length === 1 || args.help) {
  var help = `
    Phawler. Module based crawling tool working on PhantomJS.

    Usage:
      phawler -u <site_url> <options>
      phawler -l <path_to_list_file> <options>

    Options:

    -u, --url         URL what will be crawled
    -l, --list        Path to file with URLs list
    -r, --report      Reporter module. Available values: json (default), junit
    -c, --config      Path to configuration file
    -m, --modules     Comma separeted crawler modules list (All modules will be runing by default)
    -v, --verbose     Display verbose information during crawler process
    -h, --help        Display help information

    Author: Sergey Sergin <sergey-sergin@kruhak.name>
    More information: <github>
 `;

  console.log(help);
  phantom.exit();
}

if (!args.url || typeof args.url !== 'string') {
  console.log('URL not passed');
  phantom.exit();
}

// Init modules array.
var modules = [];
if (args.modules && typeof args.modules === 'string') {
  var modulesList = args.modules.split(',');
  modulesList.forEach((name) => {
    modules.push(require('./modules/' + name + '.js'));
  });
}
else {
  // Use all modules if argument not provided
  modules = [http, screenshot, status, scaled, bigfiles];
}


var crawler = new Crawler();
crawler.init(modules);
crawler.start(args.url);
crawler.crawlingEnd = () => {
  console.log(JSON.stringify(crawler.result, null, 4));
  phantom.exit();
};