import Crawler from './lib/crawlerNew';

var crawler = new Crawler('http://phantomjs.org/');

crawler.on('crawlingEnd', () => {
  console.log('Crawling successful');
  phantom.exit();
});

crawler.init();
crawler.start();