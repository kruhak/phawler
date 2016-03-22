export default (function() {

  var result = null;

  return {

    initPage: function(pageResult) {
      result = pageResult;
    },

    onLoadFinished: function(result, status) {
      result['status'] = status;
    }

  }

}());