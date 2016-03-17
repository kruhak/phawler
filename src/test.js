import Crawler from './lib/crawlerNew';
import Loader from './lib/loader';
import fs from 'fs';

const modules = Loader.getModules();
console.log(JSON.stringify(modules, null, 4));


var crawler = new Crawler('http://phantomjs.org/');

crawler.on('crawlingEnd', () => {
  console.log('Crawling successful');
  phantom.exit();
});

crawler.on('onResourceReceived', (response) => {
  console.log(response);
})

crawler.init();
crawler.start();