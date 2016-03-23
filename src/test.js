import Crawler from './lib/crawlerNew';
import Loader from './lib/loader';
import Argumentor from './lib/argumentor';
import messages from './lib/messages';
import { dump } from './lib/helper';
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

let constructors = Loader.getModules(['scaled']);
let crawler = new Crawler(args.url, constructors);

crawler.on('crawlingEnd', (result) => {
  console.log(JSON.stringify(result, null, 4));
  phantom.exit();
});

crawler.start();