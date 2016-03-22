export default (function() {

  function searchLinks() {
    return Array.prototype.slice.call(document.querySelectorAll("a"), 0)
      .map(function (link) {
        return link.getAttribute("href");
      });
  }

  var result = null;

  return {

    initPage: function(pageResult) {
      result = pageResult;
    },

    onResourceRequested: function(requestData, networkRequest) {
      if (requestData.url.indexOf('http://') > -1) {
        if (!result['httpResources']) {
          result['httpResources'] = [];
        }

        result['httpResources'].push(requestData.url);
      }
    },

    pageLoaded: function(page) {
      var links = page.evaluate(searchLinks);
      var httpLinks = links.filter(function(link) {
        return (link.indexOf('http://') > -1);
      });
      if (httpLinks) {
        result['httpLinks'] = httpLinks;
      }
    }

  }

}());
