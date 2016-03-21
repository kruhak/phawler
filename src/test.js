import Crawler from './lib/crawlerNew';
import Loader from './lib/loader';
import Implementor from './lib/implementor';
import fs from 'fs';

let modules = Loader.getModules();
console.log(modules);
let imps = new Implementor(modules);

console.log(JSON.stringify(imps.create({}), null, 4));



/*
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
  */