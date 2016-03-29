import fs from 'fs';
import Loader from './loader';
import { dump } from './helper'

/**
 * Create report from crawling results.
 */
export default class Reporter {

  /**
   * @param {Object} result Results object.
   * @param {Object} config Configuration object.
   * @param {String} formatName Name of result format.
   */
  constructor(result, config, formatName = null) {
    this.result = result;
    this.formatName = formatName || config.reporter || 'json';
    this.outputFilePath = config.outputFilePath || './';
    this.formatModule = null;
    this.formatResult = null;
  }

  /**
   * Load format module.
   *
   * @throws Throw error when module can no be loaded.
   */
  setFormatModule() {
    let loader = new Loader('./reporters');
    this.formatModule = loader.load(this.formatName);
  }

  /**
   * Process results by format module.
   */
  processResult() {
    this.formatResult = this.formatModule.processResult(this.result);
  }

  /**
   * Write processed results to file.
   */
  writeFile() {
    fs.write(this.outputFilePath + 'result.' + this.formatName, this.formatResult, 'w');
  }

  /**
   * Create report from crawling results.
   *
   * @param {Object} result Results object.
   * @param {Object} config Configuration object.
   * @param {String} formatName Name of result format.
   */
  static createReport (result, config, formatName = null) {
    let reporter = new Reporter(result, config, formatName);
    reporter.setFormatModule();
    reporter.processResult();
    reporter.writeFile();
  }

}
