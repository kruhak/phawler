/**
 * Main script.
 */

import Crawler from './lib/crawler';
import Loader from './lib/loader';
import ArgumentParser from './lib/argumentParser';
import ConfigParser from './lib/configParser';
import Reporter from './lib/reporter';
import messages from './lib/messages';

let args = ArgumentParser.getArgs();

if (Object.keys(args).length === 1 || args.help) {
  console.log(messages.help);
  phantom.exit();
}

if (!args.url || typeof args.url !== 'string') {
  console.log(messages.urlMiss);
  phantom.exit();
}

let config = ConfigParser.getConfiguration(args.config);

// Override limit parameter.
config.crawler.limit = args.limit || config.crawler.limit;

let moduleConstructors = Loader.getModules(args.modules);
let crawler = new Crawler(args.url, moduleConstructors, config);

crawler.on('crawlingEnd', (result) => {
  Reporter.createReport(result, config, args.report);
  console.log(messages.end);
  phantom.exit();
});

console.log(messages.start);
crawler.start();
