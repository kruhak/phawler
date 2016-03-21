export default class Implementor {

  constructor(constructors) {
    this.constructors = constructors;
    this.modules = [];
  }

  init(worker) {
    this.constructors.forEach((constructor) => {
      this.modules.push(new constructor(worker));
    });
    
  }

  getResult() {
    let result = {};
    
    this.modules.forEach((module) => {
      result[module.id] = module.getResult();
    });
    
    return result;
  }

}