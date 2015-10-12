export default (function() {

  var fs = require('fs');

  var format = 'jpeg',
    quality = 90,
    folder = './screens';

  return {
    init: function(config) {
      fs.removeTree(folder);

      if (config.screenshot) {
        format = config.screenshot.format || format;
        quality = config.screenshot.quality || quality;
        folder = config.screenshot.folder || folder;
      }
    },

    pageLoaded: function(page) {
      page.render(folder + '/' + page.title + '.jpg', {
        format: format,
        quality: quality
      });
    }
  }

}());