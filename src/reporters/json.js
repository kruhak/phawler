/**
 * JSON report format.
 */
export default class JsonReporter {

  /**
   * @param {Object} result Page result object.
   */
  constructor(result) {
    this.result = result;
  }

  /**
   * @return {string} Formatted JSON string.
   */
  report() {
    return JSON.stringify(this.result, null, 4);
  }

  /**
   * Create JSON string from result object.
   *
   * @param {Object} result Page result object.
   *
   * @return {string} Formatted JSON string.
   */
  static processResult(result) {
    let jsonReport = new JsonReporter(result);
    return jsonReport.report();
  }

}
