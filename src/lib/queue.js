/**
 * Simple queue for pages URLs.
 */
export default class Queue {

  constructor() {
    this.pool = [];
    this.index = -1;
  }

  /**
   * Return current queue size.
   *
   * @return {Number} Queue size.
   */
  get size() {
    return this.pool.length;
  }

  /**
   * Get current queue index.
   *
   * @return {Number} Current queue index.
   */
  get current() {
    return this.index;
  }

  /**
   * Add unique element to queue.
   *
   * @param {String} path New path.
   *
   * @return {Number|boolean} New queue size or false.
   */
  add(path) {
    return (this.pool.indexOf(path) === -1)
      ? this.pool.push(path)
      : false;
  }

  /**
   * Add multiple elements to queue.
   * 
   * @param {Array} paths Array of new elements.
   */
  addMultiple(paths) {
    paths.forEach((path) => this.add(path));
  }

  /**
   * Claim element from queue.
   * 
   * @return {String|boolean} Element or false.
   */
  claim() {
    this.index++;
    return this.pool[this.index] || false;
  }

}
