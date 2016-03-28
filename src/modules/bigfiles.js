import { dump, extractValue } from '../lib/helper';

export default class BigFiles {

  constructor(worker) {
    this.worker = worker;
    this.result = [];
    this.id = 'bigfiles';

    this.config = extractValue(this.worker, 'modulesConfig.bigfiles');
    this.config.maxFileSize = this.config.maxFileSize || 150;

    this.worker.on('onResourceReceived', (response) => this.checkResourceLength(response));
  }

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

  getResult() {
    return this.result;
  }

  clean() {
    this.result = [];
  };

}