/**
 * @module XmlReporter
 */

/** @class */
export default class XmlReporter {

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
   *   Formatted XML string.
   */
  report() {
    var xml = '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '<report>';
    for (var url in this.result) {
      xml += `<page url="${url}">`;
      for (var part in this.result[url]) {
        xml += `<part name="${part}">`;
        this.result[url][part].forEach((value) => {
          xml += `<value><![CDATA[${value}]]></value>`;
        });
        xml += '</part>';
      }
      xml += '</page>';
    }
    xml += '</report>';

    return xml;
  }

  static processResult(result) {
    let xmlReport = new XmlReporter(result);
    return xmlReport.report();
  }

}