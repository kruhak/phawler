export default class Implementor {

  constructor(modules) {
    this.modules = modules;
  }

  init(crawler) {
    this.modules.forEach((module) => module.init(crawler));
  }

  getResult() {
    let result = {};



    return result;
  }

}