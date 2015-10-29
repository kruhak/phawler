export default class XmlReporter {

  constructor(result) {
    this.result = result;
  }

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

}