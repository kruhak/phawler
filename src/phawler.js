import Crawler from './lib/crawler';
import Loader from './lib/loader';
import Argumentor from './lib/argumentor';
import ConfigParser from './lib/configParser';
import messages from './lib/messages';
import { stringify, dump, extractValue } from './lib/helper';
import URI from './vendor/urijs/src/URI'

let args = Argumentor.getArgs();

if (Object.keys(args).length === 1 || args.help) {
  console.log(messages.help);
  phantom.exit();
}

if (!args.url || typeof args.url !== 'string') {
  console.log(messages.urlMiss);
  phantom.exit();
}

let config = ConfigParser.getConfiguration(args.config);
let moduleConstructors = Loader.getModules(args.modules);
let crawler = new Crawler(args.url, moduleConstructors, config);

crawler.on('crawlingEnd', (result) => {
  console.log(JSON.stringify(result, null, 4));
  phantom.exit();
});

console.log(messages.start);
crawler.start();