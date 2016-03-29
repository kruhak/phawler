export default class HTTPS {

  /**
   * @param {Object} worker Crawler worker.
   */
  constructor(worker) {
    this.worker = worker;
    this.result = [];
    this.id = 'https';

    this.worker.on('onResourceRequested', (requestData, networkRequest) => this.checkResource(requestData, networkRequest));
  }

  checkResource(requestData, networkRequest) {
    if (requestData.url.indexOf('http://') > -1) {
      this.result.push(requestData.url);
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
