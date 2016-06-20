import fs from 'fs';
import { extractValue } from '../lib/helper';

/**
 * Create page screenshot and sae to file.
 */
export default class Screenshot {

  /**
   * @param {Object} worker Crawler worker.
   */
  constructor(worker) {
    this.id = 'screenshot';
    this.worker = worker;

    this.config = extractValue(this.worker, 'modulesConfig.screenshot');
    this.config.format = this.config.format || 'jpeg';
    this.config.quality = this.config.quality || 75;
    this.config.folder = this.config.folder || './screens';
    this.config.bgFix = (this.config.bgFix === undefined) ? true : this.config.bgFix;

    this.result = '';
    fs.removeTree(this.config.folder);

    this.worker.on('onPageOpenSuccess', (page) => this.renderScreenshot(page));
  }

  /**
   * Render screenshot for page.
   *
   * @param {Object} page PhantomJS page object.
   */
  renderScreenshot(page) {
    let filename = this.config.folder + '/' + page.title + '.jpg';

    if (this.config.bgFix) {
      page.evaluate(function() {
        document.body.bgColor = 'white';
      });
    }

    page.render(filename, {
      format: this.config.format,
      quality: this.config.quality
    });

    this.result = filename;
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
    this.result = '';
  };

}
