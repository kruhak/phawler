export default class Module {

  constructor(worker) {
    this.worker = worker;
    this.result = {};
  }
  
  getResult() {
    return this.result;
  }

}