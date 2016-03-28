import URI from '../vendor/urijs/src/URI.js';

export default class UrlNormalizer {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

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

  filterHash(uri) {
    return uri.split('#')[0];
  }

}