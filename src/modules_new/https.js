import Module from '../lib/moduleBase';

export default class HTTPS extends Module {

  constructor(worker) {
    super(worker);

    this.result = [];
    this.id = 'https';

    this.worker.on('onResourceRequested', (requestData, networkRequest) => this.checkResource(requestData, networkRequest));
  }

  checkResource(requestData, networkRequest) {
    if (requestData.url.indexOf('http://') > -1) {
      this.result.push(requestData.url);
    }
  }

}