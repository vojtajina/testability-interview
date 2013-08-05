module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      '*.js'
    ],
    autoWatch: true,
    browsers: ['Chrome'],

    // TODO(vojta): we can remove this once https://github.com/karma-runner/karma-intellij/issues/9 gets closed
    exclude: ['karma.conf.js']
  });
};