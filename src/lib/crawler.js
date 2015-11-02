import webpage from 'webpage';
import evaluates from './evaluates';
import URI from '../node_modules/urijs/src/URI.js';

export default class Crawler {

  constructor() {
    this.page = null;

    this.modules = [];

    this.index = 0;
    this.limit = null;
    this.searchLinks = true;

    this.baseUrl = null;
    this.toCrawl = [];
    this.result = {};

    this.crawlingEnd = null;
  }

  /*********** MAIN FUNCTIONS **************/

  invokeModules(event) {
    var eventName = event;
    [].shift.apply(arguments);

    this.modules.forEach((m) => {
      if (m && m.hasOwnProperty(eventName)) {
        m[eventName].apply(null, arguments);
      }
    });
  }

  filterUrls(urls) {
    return urls
      .filter((url, index) => {
        return (urls.indexOf(url) === index) && (url.indexOf(self.baseUrl) === 0 || !new RegExp('^(#|ftp|javascript|http|mailto|tel)').test(url));
      })
      .map((url) => {
          return new URI(url, this.baseUrl);
      })
      .filter((url) => {
        return (url.hostname === this.baseUrl.hostname) && !self.result[url.toString()] && (self.toCrawl.indexOf(url.toString()) === -1);
      })
      .map((url) => {
        return url.toString();
      });
  }

  /*********** PHANTOM FUNCTIONS **************/

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

  start(baseUrl) {
    this.baseUrl = new URI(baseUrl);
    this.toCrawl[this.index] = baseUrl;

    this.crawl(this.toCrawl[this.index]);
  }

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
      self.next();
    }
  }

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
