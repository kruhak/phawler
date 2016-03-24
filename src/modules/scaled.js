import { extractValue } from '../lib/helper';

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

export default class ScaledImages {

  constructor(worker) {
    this.id = 'scaled';
    this.worker = worker;

    this.config = extractValue(this.worker, 'modulesConfig.scaled');
    this.config.scaleIndex = this.config.scaleIndex || 1.5;

    this.result = [];

    this.worker.on('onPageOpen', (page) => this.findScaledImg(page));
  }

  getResult() {
    return this.result;
  }
  
  findScaledImg(page) {
    this.result = page.evaluate(_evalFindScaledImages, this.config.scaleIndex);
  }
  
}