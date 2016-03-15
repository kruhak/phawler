import URI from '../vendor/urijs/src/URI.js';

export default class UrlNormalizer {

  constructor(baseUrl) {
    this.baseUrl = new URI(baseUrl).normalize();
  }

  normalize(values) {
    let normalized = [];

    values.forEach((value) => {
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

}