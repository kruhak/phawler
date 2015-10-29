#!/usr/bin/env phantomjs

import system from 'system';
import fs from 'fs';
import minimist from './node_modules/minimist/index.js';
import Crawler from './lib/crawler.js'

var args = minimist(system.args, {
  alias: {
    url: 'u',
    list: 'l',
    report: 'r',
    limit: 'l',
    config: 'c',
    modules: 'm',
    verbose: 'v',
    help: 'h'
  }
});

var modules = [];
var modulesList = ['http', 'screenshot', 'status', 'scaled', 'bigfiles'];

var reporterName = 'json';
var config = {};

if (Object.keys(args).length === 1 || args.help) {
  var help = `
    Phawler. Module based crawling tool working on PhantomJS.

    Usage:
      phantomjs phawler.js -u <site_url> <options>

    Options:

    -u, --url         URL what will be crawled
    -r, --report      Reporter module. Available values: json (default)
    -l, --limit       Maximum number of pages that can be crawled
    -c, --config      Path to configuration file
    -m, --modules     Comma separated crawler modules list (All modules will be running by default)
    -h, --help        Display help information
 `;

  console.log(help);
  phantom.exit();
}

if (!args.url || typeof args.url !== 'string') {
  console.log('URL not passed');
  phantom.exit();
}

// Init modules
if (args.modules && typeof args.modules === 'string') {
  modulesList = args.modules.split(',');
}
modulesList.forEach((name) => {
  modules.push(require('./modules/' + name + '.js'));
});

// Init report module
if (args.report && typeof args.report === 'string') {
  reporterName = args.report;
}
var reporterModule = require('./reporters/' + reporterName + '.js');

// Init configuration
if (args.config && typeof args.config === 'string') {
  config = require(fs.absolute(args.config));
}

// Init limit
if (args.limit && typeof args.limit === 'number') {
  config.limit = args.limit;
}

var crawler = new Crawler();
crawler.init(modules, config);
crawler.start(args.url);
crawler.crawlingEnd = () => {
  var reporter = new reporterModule(crawler.result);
  var report = reporter.report();
  fs.write('result.' + reporterName, report, 'w');
  phantom.exit();
};