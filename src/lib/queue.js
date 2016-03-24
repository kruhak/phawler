export default class Queue {

  constructor() {
    this.pool = [];
    this.index = -1;
  }

  get size() {
    return this.pool.length;
  }

  get current() {
    return this.index;
  }

  add(path) {
    return (this.pool.indexOf(path) === -1)
      ? this.pool.push(path)
      : false;
  }

  addMultiple(paths) {
    paths.forEach((path) => this.add(path));
  }

  claim() {
    this.index++;
    return this.pool[this.index];
  }

  clean() {
    this.pool = [];
    return (this.pool.length === 0);
  }

}
