export default class JsonReporter {

  constructor(result) {
    this.result = result;
  }

  report() {
    return JSON.stringify(this.result, null, 4);
  }

}