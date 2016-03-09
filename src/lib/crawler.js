/**
 * @module Crawler
 */

import webpage from 'webpage';
import evaluates from './evaluates';
import URI from '../vendor/urijs/src/URI.js';

/** @class */
export default class Crawler {

  /**
   * @constructor
   */
  constructor() {

    /**
     * PhantomJS page object.
     *
     * @type {object}
     */
    this.page = {};

    /**
     * Modules objects array.
     *
     * @type {Array}
     */
    this.modules = [];

    /**
     * Current crawling index.
     *
     * @type {number}
     */
    this.index = 0;

    /**
     * Count pages what can be crawled.
     *
     * @type {number}
     */
    this.limit = null;

    /**
     * Search new links on a page.
     *
     * @type {boolean}
     */
    this.searchLinks = true;

    /**
     * Base URL for search new links.
     *
     * @type {object}
     */
    this.baseUrl = null;

    /**
     * Links for crawling.
     *
     * @type {Array}
     */
    this.toCrawl = [];

    /**
     * Crawling results.
     *
     * @type {object}
     */
    this.result = {};

    /**
     * Function what will be executed after crawling process.
     *
     * @type {function}
     */
    this.crawlingEnd = null;
  }

  /**
   * Execute function from all modules.
   *
   * @param {string} event
   */
  invokeModules(event) {
    var eventName = event;
    [].shift.apply(arguments);

    this.modules.forEach((m) => {
      if (m && m.hasOwnProperty(eventName)) {
        m[eventName].apply(null, arguments);
      }
    });
  }

  /**
   * Delete duplicates, external and non-http links.
   *
   * @param {array} urls
   *
   * @returns {array} - Filtered URLs array.
   */
  filterUrls(urls) {
    return urls
      .filter((url, index) => {
        return (urls.indexOf(url) === index) && (url.indexOf(this.baseUrl) === 0 || !new RegExp('^(#|ftp|javascript|http|mailto|tel)').test(url));
      })
      .map((url) => {
          return new URI(url, this.baseUrl);
      })
      .filter((url) => {
        return (url.hostname === this.baseUrl.hostname) && !this.result[url.toString()] && (this.toCrawl.indexOf(url.toString()) === -1);
      })
      .map((url) => {
        return url.toString();
      });
  }

  /**
   * Init modules, configuration and create PhantomJS page.
   *
   * @param {array} modules - Modules objects array.
   * @param {object} config - Configuration object.
   */
  init(modules, config) {
    if (config.limit) {
      this.limit = config.limit;
    }

    // Init modules
    this.modules = modules;
    this.invokeModules('init', config);

    // Create PhantomJS page.
    var page = webpage.create();
    page.onResourceRequested = (requestData, networkRequest) => { this.invokeModules('onResourceRequested', requestData, networkRequest); };
    page.onResourceReceived = (response) => { this.invokeModules('onResourceReceived', response) };
    page.onLoadFinished = (status) => { this.invokeModules('onLoadFinished', status) };

    this.page = page;
  }

  /**
   * Start crawling process from provided base URL.
   *
   * @param {string} baseUrl - URL for start crawling.
   */
  start(baseUrl) {
    this.baseUrl = new URI(baseUrl);
    this.toCrawl[this.index] = baseUrl;

    this.crawl(this.toCrawl[this.index]);
  }

  /**
   * Crawl URL and invoke modules.
   *
   * @param {string} url - URL for crawl.
   */
  crawl(url) {
    if (!this.result[url]) {
      this.result[url] = {};

      this.invokeModules('initPage', this.result[url]);

      this.page.open(url, (status) => {
        console.log(url + ': ' + status);

        this.invokeModules('pageLoaded', this.page);

        if (this.searchLinks) {
          var urls = this.page.evaluate(evaluates.findUrls);
          this.toCrawl = this.toCrawl.concat(this.filterUrls(urls));
        }

        this.next();

      });
    }
    else {
      this.next();
    }
  }

  /**
   * Crawl next URL or stop process.
   */
  next() {
    this.index++;

    if (this.index < this.limit && this.toCrawl[this.index]) {
      this.crawl(this.toCrawl[this.index]);
    }
    else {
      if (this.crawlingEnd) {
        this.crawlingEnd();
      }
    }
  }
}
