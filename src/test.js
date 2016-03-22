import Crawler from './lib/crawlerNew';
import Loader from './lib/loader';

let constructors = Loader.getModules(['scaled']);
let crawler = new Crawler('http://togetho.ru/', constructors);

crawler.on('crawlingEnd', (result) => {
  console.log(JSON.stringify(result, null, 4));
  phantom.exit();
});

crawler.start();