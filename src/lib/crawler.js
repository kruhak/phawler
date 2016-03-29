import EventEmitter from '../vendor/smelly-event-emitter/dist/event-emitter.js';
import URI from '../vendor/urijs/src/URI.js';
import Worker from './worker';
import Queue from './queue';
import UrlNormalizer from './urlNormalizer';
import { extractValue } from './helper';

/**
 * Crawl site pages using worker.
 */
export default class Crawler extends EventEmitter {

  /**
   * @param {String} baseUrl URL what has been used as base for crawling.
   * @param {Object[]} constructors Modules constructors.
   * @param {Object} config Configuration object.
   */
  constructor(baseUrl, constructors, config) {
    super();

    this.limit = extractValue(config, 'crawler.limit') || 0;

    this.result = {};

    this.worker = new Worker(constructors, config);
    this.baseUrl = new URI(baseUrl).normalize();
    this.queue = new Queue();
    this.normalizer = new UrlNormalizer(this.baseUrl);
  }

  /**
   * Start crawling process.
   */
  start() {
    this.queue.add(this.baseUrl.toString());
    this.crawl(this.queue.claim());

    this.worker.on('onPageCrawled', (pageUrl, urls, result, status) => {
      console.log(pageUrl + ' : ' + status);
      this.result[pageUrl] = result;
      this.result[pageUrl]['status'] = status;
      let normalized = this.normalizer.normalize(urls);
      this.queue.addMultiple(normalized);

      this.next();
    });
  }

  /**
   * Crawl URL using worker.
   *
   * @param {String} url URL what will be crawled.
   */
  crawl(url) {
    this.worker.process(url);
  }

  /**
   * Process next element from queue or stop crawling process.
   *
   * @emits {crawlingEnd} Emit event when crawling process successfully stopped.
   */
  next() {
    if (this.checkLimit() && this.queue.size !== 0) {
      let nextElement = this.queue.claim();
      nextElement
        ? this.crawl(nextElement)
        : this.emit('crawlingEnd', this.result);
    }
    else {
      this.emit('crawlingEnd', this.result);
    }
  }

  /**
   * check limit parameter.
   *
   * @return {boolean} Will next element crawled or not.
   */
  checkLimit() {
    if (this.limit !== 0) {
      return this.queue.current < this.limit;
    }

    return true;
  }
}
