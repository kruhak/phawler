import EventEmitter from '../vendor/smelly-event-emitter/dist/event-emitter.js';
import URI from '../vendor/urijs/src/URI.js';
import Queue from './queue';
import UrlNormalizer from './urlNormalizer';
import evaluates from './evaluates';
import webPage from 'webpage';

export default class Crawler extends EventEmitter {

  constructor(baseUrl) {
    super();

    this.limit = 0;

    this.baseUrl = new URI(baseUrl).normalize().toString();
    this.page = webPage.create();
    this.queue = new Queue();
    this.normalizer = new UrlNormalizer(this.baseUrl);
  }

  init() {
    this.queue.add(this.baseUrl);

    this.on('pageCrawled', (status) => {
      this.limit++;

      this.limit < 20 && this.queue.size !== 0
        ? this.crawl(this.queue.claim())
        : this.emit('crawlingEnd');
    });
  }

  start() {
    this.crawl(this.queue.claim());
  }

  crawl(url) {
    this.page.open(url, (status) => {
      console.log(url + ' : ' + status);

      if (status === 'success') {
        var urls = this.page.evaluate(evaluates.findUrls);
        var norm = this.normalizer.normalize(urls);

        norm.forEach((url) => {
          this.queue.add(url);
        });

      }

      this.emit('pageCrawled', status);
    });
  }

}