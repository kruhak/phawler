/**
 * @module JsonReporter
 */

/** @class */
export default class JsonReporter {

  /**
   * @constructor
   *
   * @param {object} result - Page result after crawling process end.
   */
  constructor(result) {

    /** @type {object} */
    this.result = result;
  }

  /**
   * @returns {string}
   *   Formatted JSON string.
   */
  report() {
    return JSON.stringify(this.result, null, 4);
  }

  static processResult(result) {
    let jsonReport = new JsonReporter(result);
    return jsonReport.report();
  }

}