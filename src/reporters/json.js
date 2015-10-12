var fs = require('fs');

export default class JsonReporter {

  constructor(result) {
    this.result = result;
  }

  report() {
    var stringResult = JSON.stringify(this.result, null, 4);
    //console.log(stringResult);
    fs.write('result.json', stringResult, 'w');
  }

}