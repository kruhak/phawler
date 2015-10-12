# Phawler. Module based crawling tool working on PhantomJS.

## Installation

- Install dependencies.

You can use ``` npm install ``` or manually put [minimist](https://github.com/substack/minimist) and [urijs](https://github.com/medialize/URI.js/) modules to **node_modules** directory

## Usage

    phantomjs phawler.js -u <site_url> <options>

    Options:

    -u, --url         URL what will be crawled
    -r, --report      Reporter module. Available values: json (default)
    -l, --limit       Maximum number of pages that can be crawled
    -c, --config      Path to configuration file
    -m, --modules     Comma separated crawler modules list (All modules will be running by default)
    -h, --help        Display help information