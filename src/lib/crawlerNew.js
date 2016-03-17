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

    this.baseUrl = new URI(baseUrl).normalize();
    this.page = webPage.create();
    this.queue = new Queue();
    this.normalizer = new UrlNormalizer(this.baseUrl);
  }

  init() {
    this.page.onAlert = (msg) => this.emit('onAlert', msg);
    this.page.onCallback = (data) => this.emit('onCallback', data);
    this.page.onClosing = (closingPage) => this.emit('onClosing', closingPage);
    this.page.onConfirm = (msg) => this.emit('onConfirm', msg);
    this.page.onConsoleMessage = (msg, lineNum, sourceId) => this.emit('onConsoleMessage', msg, lineNum, sourceId);
    this.page.onError = (msg, trace) => this.emit('onError', msg, trace);
    this.page.onFilePicker = (oldFile) => this.emit('onFilePicker', oldFile);
    this.page.onInitialized = () => this.emit('onInitialized');
    this.page.onLoadFinished = (status) => this.emit('onLoadFinished', status);
    this.page.onLoadStarted = () => this.emit('onLoadStarted');
    this.page.onNavigationRequested = (url, type, willNavigate, main) => this.emit('onNavigationRequested', url, type, willNavigate, main);
    this.page.onPageCreated = (newPage) => this.emit('onPageCreated', newPage);
    this.page.onPrompt = (msg, defaultVal) => this.emit('onPrompt', msg, defaultVal);
    this.page.onResourceError = (resourceError) => this.emit('onResourceError', resourceError);
    this.page.onResourceReceived = (response) => this.emit('onResourceReceived', response);
    this.page.onResourceRequested = (requestData, networkRequest) => this.emit('onResourceRequested', requestData, networkRequest);
    this.page.onResourceTimeout = (request) => this.emit('onResourceTimeout', request);
    this.page.onUrlChanged = (targetUrl) => this.emit('onUrlChanged', targetUrl);
  }

  start() {
    this.queue.add(this.baseUrl.toString());
    this.crawl(this.queue.claim());
  }

  crawl(url) {
    this.page.open(url, (status) => {
      console.log(url + ' : ' + status);

      if (status === 'success') {
        let urls = this.page.evaluate(evaluates.findUrls);
        let normalized = this.normalizer.normalize(urls);
        this.queue.addMultiple(normalized);
      }

      this.emit('pageOpen', status, this.page);

      this.next();
    });
  }

  next() {
    this.limit++;

    this.limit < 1 && this.queue.size !== 0
      ? this.crawl(this.queue.claim())
      : this.emit('crawlingEnd');
  }
}