import fs from 'fs';
import { endsWith } from './helper';

/**
 * Load modules using "require" from custom directory.
 */
export default class Loader {

  /**
   * @param {String} path Modules location.
   */
  constructor(path = './modules') {
    this.path = fs.absolute(path);
  }

  /**
   * Load single module.
   *
   * @param {String} name Module name
   *
   * @throw Throw error when module not exists ot can not be loaded.
   *
   * @return {*} Default module contents.
   */
  load(name) {
    name = !endsWith(name, '.js') ? name + '.js' : name;
    let modulePath = `${this.path}/${name}`;

    return require(modulePath);
  }

  /**
   * Load modules list.
   *
   * @param {Array} list List of modules names.
   *
   * @returns {Array} Array of modules contents.
   */
  loadList(list = []) {
    let modules = [];

    list.forEach((name) => {
      modules.push(this.load(name));
    });

    return modules;
  }

  /**
   * Load all modules from path.
   *
   * @returns {Array} Array of modules contents.
   */
  loadAll() {
    let filesList = fs.list(this.path).filter((fileName) => {
      return fileName !== '.' && fileName !== '..' && endsWith(fileName, '.js');
    });

    return this.loadList(filesList);
  }

  /**
   * Load modules.
   *
   * @param {Array|String} list Modules names. If this variable is string then she will be split by comma.
   *
   * @returns {Array} Array of modules contents.
   */
  static getModules(list = []) {
    list = (typeof list === 'string') ? list.split(',') : list;
    let loader = new Loader();
    return list.length > 0 ? loader.loadList(list) : loader.loadAll();
  }

}
