import Crawler from './lib/crawlerNew';
import Loader from './lib/loader';
import fs from 'fs';
import Worker from './lib/worker';

let constructors = Loader.getModules();

let crawler = new Crawler('http://phantomjs.org/', constructors);

crawler.on('crawlingEnd', (result) => {
  console.log(JSON.stringify(result, null, 4));
  phantom.exit();
});

crawler.start();