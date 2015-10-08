export default (function() {

  var fs = require('fs');

  var format = 'jpeg',
    quality = 90,
    folder = './screens';

  return {
    init: function() {
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