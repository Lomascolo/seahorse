/**
 * Copyright (c) 2015, CodiLime Inc.
 */
'use strict';

module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      './node_modules/angular/angular.js',
      './node_modules/angular-ui-router/release/angular-ui-router.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './client/**/*.test.js'
    ],

    autoWatch : true,

    frameworks: ['browserify', 'jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-browserify'
            ],

   preprocessors: {
      './client/**/*.test.js': [ 'browserify' ]
    },

    browserify: {
      transform: ['browserify-shim', '6to5ify']
    },

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
