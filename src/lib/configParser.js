import fs from 'fs';
import deepmerge  from '../vendor/deepmerge/index';

/**
 * Default configuration.
 */
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

/**
 * Parse configuration file and merge with default params.
 */
export default class ConfigParser {

  constructor() {
    this.config = {};
  }

  /**
   * Merge some new values with existing.
   *
   * @param {Object} values New values.
   */
  setValues(values) {
    this.config = deepmerge(this.config, values);
  }

  /**
   * Get configuration from file and merge with existing.
   *
   * @param filePath
   */
  setConfigFileValues(filePath = null) {
    if (filePath) {
      filePath = fs.absolute(filePath);
      let fileConfig = require(filePath);
      this.config = deepmerge(this.config, fileConfig);
    }
  }

  /**
   * Return final configuration.
   *
   * @return {Object} Configuration object.
   */
  getConfig() {
    return this.config;
  }

  /**
   * Get coonfiguration using default values merged with values from file.
   *
   * @param {String} filePath Path to configuration file.
   *
   * @return {Object} Configuration object.
   */
  static getConfiguration(filePath = null) {
    let configParser = new ConfigParser();
    configParser.setValues(defaultConfig);
    configParser.setConfigFileValues(filePath);
    return configParser.getConfig();
  }

}
