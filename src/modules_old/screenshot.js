export default (function() {

  var fs = require('fs');

  var format = 'jpeg';
  var quality = 90;
  var folder = './screens';

  return {
    init: function(config) {
      if (config.screenshot) {
        format = config.screenshot.format || format;
        quality = config.screenshot.quality || quality;
        folder = config.screenshot.folder || folder;
      }

      fs.removeTree(folder);
    },

    pageLoaded: function(page) {
      page.render(folder + '/' + page.title + '.jpg', {
        format: format,
        quality: quality
      });
    }
  }

}());