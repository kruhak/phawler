import fs from 'fs';
import deepmerge  from '../vendor/deepmerge/index';
import { dump } from './helper';

const defaultConfig = {

  // Crawler settings
  crawler: {
    limit: 0,
    viewportSize: {
      width: 1920,
      height: 1080
    }
  },

  // Modules specific
  modulesRun: [],
  modules: {
    scaled: {
      scaleIndex: 1.5
    }
  },

  // Report
  reporter: 'json',
  outputFilePath: './'
};

export default class ConfigParser {

  constructor() {
    this.config = {};
  }

  setValues(values) {
    this.config = deepmerge(this.config, values);
  }

  setConfigFileValues(filePath = null) {
    if (filePath) {
      filePath = fs.absolute(filePath);
      let fileConfig = require(filePath);
      this.config = deepmerge(this.config, fileConfig);
    }
  }

  getConfig() {
    return this.config;
  }

  static getConfiguration(filePath = null) {
    let configParser = new ConfigParser();
    configParser.setValues(defaultConfig);
    configParser.setConfigFileValues(filePath);
    return configParser.getConfig();
  }

}