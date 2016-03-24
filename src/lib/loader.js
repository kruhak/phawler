import fs from 'fs';
import { endsWith } from './helper';

export default class Loader {

  constructor(path = './modules') {
    this.path = fs.absolute(path);
  }

  load(name) {
    name = !endsWith(name, '.js') ? name + '.js' : name;
    let modulePath = `${this.path}/${name}`;

    return require(modulePath);
  }

  loadList(list = []) {
    let modules = [];

    list.forEach((name) => {
      modules.push(this.load(name));
    });

    return modules;
  }

  loadAll() {
    let filesList = fs.list(this.path).filter((fileName) => {
      return fileName !== '.' && fileName !== '..' && endsWith(fileName, '.js');
    });

    return this.loadList(filesList);
  }

  static getModules(list = []) {
    list = (typeof list === 'string') ? list.split(',') : list;
    let loader = new Loader();
    return list.length > 0 ? loader.loadList(list) : loader.loadAll();
  }

}