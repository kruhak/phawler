import { extractValue } from '../lib/helper';

/**
 * Evaluate function. Find scaled images on page.
 *
 * @param {Number} maxScaleIndex Maximum scale index.
 * @return {Array} Array of links to scaled images.
 * @private
 */
function _evalFindScaledImages(maxScaleIndex ) {
  var scaledImages = [];
  var images = document.getElementsByTagName('img');

  for (var i = 0; i < images.length; i++) {
    if (images[i].width < images[i].naturalWidth || (images[i].height < images[i].naturalHeight)) {
      var widthRation = (images[i].naturalWidth / images[i].width).toFixed(2);
      var heightRatio = (images[i].naturalHeight / images[i].height).toFixed(2);

      if (parseFloat(widthRation) > maxScaleIndex || parseFloat(heightRatio) > maxScaleIndex) {
        scaledImages.push(images[i].src);
      }
    }
  }
  return scaledImages;
}

/**
 * Find scaled images on page.
 */
export default class ScaledImages {

  /**
   * @param {Object} worker Crawler worker.
   */
  constructor(worker) {
    this.id = 'scaled';
    this.worker = worker;

    this.config = extractValue(this.worker, 'modulesConfig.scaled');
    this.config.scaleIndex = this.config.scaleIndex || 1.5;

    this.result = [];

    this.worker.on('onPageOpenSuccess', (page) => this.findScaledImg(page));
  }

  findScaledImg(page) {
    this.result = page.evaluate(_evalFindScaledImages, this.config.scaleIndex);
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
