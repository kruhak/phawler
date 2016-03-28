import fs from 'fs';
import { extractValue } from '../lib/helper';

export default class Screenshot {

  constructor(worker) {
    this.id = 'screenshot';
    this.worker = worker;

    this.config = extractValue(this.worker, 'modulesConfig.screenshot');
    this.config.format = this.config.format || 'jpeg';
    this.config.quality = this.config.quality || 75;
    this.config.folder = this.config.folder || './screens';

    this.result = '';
    fs.removeTree(this.config.folder);

    this.worker.on('onPageOpenSuccess', (page) => this.getScreenshot(page));
  }

  getResult() {
    return this.result;
  }

  getScreenshot(page) {
    let filename = this.config.folder + '/' + page.title + '.jpg';

    page.render(filename, {
      format: this.config.format,
      quality: this.config.quality
    });

    this.result = filename;
  }

  clean() {
    this.result = '';
  };
  
}