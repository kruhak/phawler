export default (function() {

  var result = null;

  return {

    init: function(pageResult) {
      result = pageResult;
    },

    onLoadFinished: function(result, status) {
      result['status'] = status;
    }
  }

}());