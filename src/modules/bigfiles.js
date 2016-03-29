import { dump, extractValue } from '../lib/helper';

/**
 * Search resources with big content length.
 */
export default class BigFiles {

  /**
   * @param {Object} worker Crawler worker.
   */
  constructor(worker) {
    this.worker = worker;
    this.result = [];
    this.id = 'bigfiles';

    this.config = extractValue(this.worker, 'modulesConfig.bigfiles');
    this.config.maxFileSize = this.config.maxFileSize || 150;

    this.worker.on('onResourceReceived', (response) => this.checkResourceLength(response));
  }

  /**
   * Check resource content length.
   *
   * @param {Object} response PhantomJS response object.
   */
  checkResourceLength(response) {
    if (response.stage == "end" && response.status == 200) {

      response.headers.forEach(header => {
        if (header.name === 'Content-Length') {
          let size = parseInt(header.value) / 1024;

          if (size > this.config.maxFileSize) {
            this.result.push(response.url);
          }
        }
      });
    }
  }

  /**
   * Get module result.
   *
   * @returns {Array} Results array.
   */
  getResult() {
    return this.result;
  }

  /**
   * Clean module result storage.
   */
  clean() {
    this.result = [];
  };

}
