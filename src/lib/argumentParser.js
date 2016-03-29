import system from 'system';
import minimist from '../vendor/minimist/index.js';

/**
 * Default aliases.
 */
const alias = {
  url: 'u',
  report: 'r',
  limit: 'l',
  config: 'c',
  modules: 'm',
  verbose: 'v',
  help: 'h'
};

/**
 * Parse PhantomJS arguments using Minimist library.
 */
export default class ArgumentParser {

  /**
   * @param {Object} aliases Minimist aliases object.
   */
  constructor(aliases) {
    this.aliases = aliases;
  }

  /**
   * Call Minimist and return parsed arguments.
   *
   * @method convertSystemArgs
   */
  convertSystemArgs() {
    return minimist(system.args, {
      alias: this.aliases
    });
  }

  /**
   * Parse arguments using default aliases.
   *
   * @return {Object} Parsed arguments.
   */
  static getArgs() {
    let argumentor = new ArgumentParser(alias);
    return argumentor.convertSystemArgs();
  }

}
