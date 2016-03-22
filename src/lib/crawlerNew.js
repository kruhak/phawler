import EventEmitter from '../vendor/smelly-event-emitter/dist/event-emitter.js';
import URI from '../vendor/urijs/src/URI.js';
import Worker from './worker';
import Queue from './queue';
import UrlNormalizer from './urlNormalizer';

export default class Crawler extends EventEmitter {

  constructor(baseUrl, constructors) {
    super();

    this.limit = 0;

    this.result = {};

    this.worker = new Worker(constructors);
    this.baseUrl = new URI(baseUrl).normalize();
    this.queue = new Queue();
    this.normalizer = new UrlNormalizer(this.baseUrl);
  }

  start() {
    this.queue.add(this.baseUrl.toString());
    this.crawl(this.queue.claim());

    this.worker.on('onPageCrawled', (pageUrl, urls, result) => {
      console.log(pageUrl);
      this.result[pageUrl] = result;
      let normalized = this.normalizer.normalize(urls);
      this.queue.addMultiple(normalized);

      this.next();
    });
  }

  crawl(url) {
    this.worker.process(url);
  }

  next() {
    this.limit++;

    this.limit < 10 && this.queue.size !== 0
      ? this.crawl(this.queue.claim())
      : this.emit('crawlingEnd', this.result);
  }
}