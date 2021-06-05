module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: [
      'mocha',
      'detectBrowsers'
    ],
    files: [
      './node_modules/es5-shim/es5-shim.js',
      './node_modules/es5-shim/es5-sham.js',
      './node_modules/power-assert/build/power-assert.js',
      './weakmap-polyfill.js',
      './tests/test.js'
    ],
    exclude: [],
    preprocessors: {},
    client: {
      mocha: {
        reporter: 'html',
        ui: 'bdd'
      }
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch: false,
    customLaunchers: {
      // Custom launchers for Travis
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    detectBrowsers: {
      enabled: true,
      usePhantomJS: false,
      postDetection: function(availableBrowser) {
        if (process.env.TRAVIS) {
          return ['Chrome_travis_ci'];
        }

        if (availableBrowser) {
          const ieIndex = availableBrowser.indexOf('IE');
          if (ieIndex !== -1) {
            // Exclude IE because it do not work
            availableBrowser.splice(ieIndex, 1);
          }
        }
        return availableBrowser;
      }
    },
    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-ie-launcher',
      'karma-safari-launcher',
      'karma-detect-browsers'
    ],
    singleRun: true,
    concurrency: Infinity
  });
};
