import URI from '../vendor/urijs/src/URI.js';

/**
 * Filter and normalize URLs using URI.js library.
 */
export default class UrlNormalizer {

  /**
   * @param {Object} baseUrl URI.js object of base URL. 
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * Normalize URI values.
   *
   * @param {Array} values Not processed URLs.
   * @return {Array} Filtered and normalized URLs.
   */
  normalize(values) {
    let normalized = [];

    values.forEach((value) => {
      value = this.filterHash(value);
      value = new URI(value).normalize();

      if (value.is('url')) {
        if (value.is('relative')) {
          normalized.push(value.absoluteTo(this.baseUrl).toString());
        }
        else if (value.is('absolute') && value.origin() === this.baseUrl.origin()) {
          normalized.push(value.toString());
        }
      }
    });

    return normalized;
  }

  /**
   * Filter anchor hash from string.
   * 
   * @param {String} uri URL string.
   * @return {*} URL without anchor hash.
   */
  filterHash(uri) {
    return uri.split('#')[0];
  }

}
