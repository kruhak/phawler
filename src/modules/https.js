export default class HTTPS {

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

  getResult() {
    return this.result;
  }

  clean() {
    this.result = [];
  };

}