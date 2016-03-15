export default class EventEmitter {

  constructor() {
    this.listeners = {};
  }

  on(evt, callback) {
    this.listeners[evt] = this.listeners[evt] || [];
    this.listeners[evt].push(callback);
  }

  off() {

  }

  emit(evt, ...args) {
    
  }

}