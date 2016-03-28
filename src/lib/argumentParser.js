import system from 'system';
import minimist from '../vendor/minimist/index.js';

const alias = {
  url: 'u',
  report: 'r',
  limit: 'l',
  config: 'c',
  modules: 'm',
  verbose: 'v',
  help: 'h'
};

export default class ArgumentParser {

  constructor(aliases) {
    this.aliases = aliases;
  }

  convertSystemArgs() {
    return minimist(system.args, {
      alias: this.aliases
    });
  }

  static getArgs() {
    let argumentor = new ArgumentParser(alias);
    return argumentor.convertSystemArgs();
  }

}