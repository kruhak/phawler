let messages = {
  help: `
    Phawler. Module based crawling tool working on PhantomJS.

    Usage:
      phantomjs phawler.js -u <site_url> <options>

    Options:

    -u, --url         URL what will be crawled
    -r, --report      Reporter module. Available values: json (default), xml
    -l, --limit       Maximum number of pages that can be crawled
    -c, --config      Path to configuration file
    -m, --modules     Comma separated crawler modules list (All modules will be running by default)
    -h, --help        Display help information
 `,
  urlMiss: 'Missing required URL parameter',
  start: 'Start crawling...'
};

export default messages;