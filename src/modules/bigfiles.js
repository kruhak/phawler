export default (function() {

  var maxFileSize = 100;
  var result = null;

  return {
//    init: function(config) {
//      if (config.bigfiles) {
//        if (config.bigfiles.maxFileSize) {
//          maxFileSize = config.bigfiles.maxFileSize;
//        }
//      }
//    },

    pageInit: function(pageResult) {
      result = pageResult;
    },

    onResourceReceived: function(response) {
      if (response.stage == "end" && response.status == 200) {
        var size = 0;

        for (var headerName in response.headers) {
          var header = response.headers[headerName];
          if (header.name === 'Content-Length') {
            size = parseInt(header.value) / 1024;
            if (size > maxFileSize) {
              if (!result['bigfiles']) {
                result['bigfiles'] = {};
              }

              result['bigfiles'][response.url] = size.toFixed();
            }
          }
        }
      }
    }
  }

}());
