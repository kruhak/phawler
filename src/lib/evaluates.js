/**
 * Evaluate function. Find all URLs on the page.
 *
 * @return {Array} Array of URLs.
 */
export function findUrls() {
  return Array.prototype.slice.call(document.querySelectorAll("a"), 0)
    .map(function (link) {
      return link.getAttribute("href");
    });
}
