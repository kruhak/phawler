export default (function() {

  var result = null;

  var maxScaleIndex = 1.05;

  return {
    init: function(config) {
      if (config.scaledImages) {
        if (config.scaledImages.maxScaleIndex) {
          maxScaleIndex = config.scaledImages.maxScaleIndex;
        }
      }
    },

    initPage: function(pageResult) {
      result = pageResult;
    },

    pageLoaded: function(page) {
      var scaledImages = page.evaluate(function(maxScaleIndex) {
        var scaledImages = {};
        var images = document.getElementsByTagName('img');
        for (var i = 0; i < images.length; i++) {
          if (images[i].width < images[i].naturalWidth || (images[i].height < images[i].naturalHeight)) {
            var widthRation = (images[i].naturalWidth / images[i].width).toFixed(2);
            var heightRatio = (images[i].naturalHeight / images[i].height).toFixed(2);
            if (parseFloat(widthRation) > maxScaleIndex || parseFloat(heightRatio) > maxScaleIndex) {
              scaledImages[images[i].src] = {
                widthRatio: widthRation,
                heightRatio: heightRatio
              }
            }
          }
        }
        return scaledImages;
      }, maxScaleIndex);

      if (Object.keys(scaledImages).length > 0) {
        result['scaledImages'] = scaledImages;
      }
    }
  }

}());
