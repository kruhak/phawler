import fs from 'fs';
import Loader from './loader';
import { dump } from './helper'

export default class Reporter {

  constructor(result, config, formatName = null) {
    this.result = result;
    this.formatName = formatName || config.reporter || 'json';
    this.outputFilePath = config.outputFilePath || './';
    this.formatModule = null;
    this.formatResult = null;
  }

  setFormatModule() {
    let loader = new Loader('./reporters');
    this.formatModule = loader.load(this.formatName);
  }

  processResult() {
    this.formatResult = this.formatModule.processResult(this.result);
  }

  writeFile() {
    fs.write(this.outputFilePath + 'result.' + this.formatName, this.formatResult, 'w');
  }

  static createReport (result, config, formatName = null) {
    let reporter = new Reporter(result, config, formatName);
    reporter.setFormatModule();
    reporter.processResult();
    reporter.writeFile();
  }

}
