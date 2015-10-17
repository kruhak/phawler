# Phawler. Modular crawling tool for PhantomJS.

**Phawler** is a crawling tool for [PhantomJS](http://phantomjs.org/) which can be used for checking site's pages using various criteria and saving results to file. For example it can be used for searching for *http* links and assets on *https* pages. **Phawler** is modular and can be extended by adding new modules to provide new kinds of checking/processing and new reporters.

## Installation

  - Install [PhantomJS](http://phantomjs.org/)
  - Install dependencies by executing `npm install` within **Phawler** root directory or manually put [minimist](https://github.com/substack/minimist) and [urijs](https://github.com/medialize/URI.js/) modules to **node_modules** directory.

## Available modules

 - **HTTP Assets and links (http)** - checks for *http* links and assets, useful on *https* pages to avoid security warnings and errors.
 - **Scaled images (scaled)** - checks for scaled (usually down) images by CSS styles so loaded images have different original size (usually bigger).
 - **Big files (bigfiles)** - checks for big assets loaded on pages.
 - **Screenshot (screenshot)** - makes screenshots of crawled pages.
 - **Status (status)** - checkes if page can actually be loaded or not (for example if network errors occurred).
 
**Reporting:**
 
 - **JSON (json)** - saves crawling results reports to files in JSON format.

## Usage

    phantomjs phawler.js -u <site_url> <options>

    Options:

    -u, --url         URL what will be crawled
    -r, --report      Reporter module. Available values: json (default)
    -l, --limit       Maximum number of pages that can be crawled
    -c, --config      Path to configuration file
    -m, --modules     Comma separated crawler modules list (All modules will be running by default)
    -h, --help        Display help information
