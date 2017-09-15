'use strict';

const config = {
  // localhost - from docker compose
  'apiHost': window.location.protocol + '//' + window.location.hostname,
  'docsHost': 'https://seahorse.deepsense.ai',
  'notebookHost': window.location.protocol + '//' + window.location.host + '/jupyter',
  'sessionApiPort': window.location.port,
  'sessionPollingInterval': 1000,
  'apiPort': window.location.port,
  'apiVersion': '1.4.0',
  'editorVersion': '1.4.0',
  'urlApiVersion': 'v1',
  'resultsRefreshInterval': 10000,
  'socketConnectionHost': window.location.protocol + '//' + window.location.host + '/',
  'socketReconnectionInterval': 1000,
  'mqUser': 'yNNp7VJS',
  'mqPass': '1ElYfGNW',
  'libraryPrefix': 'library://'
};

angular.module('ds.lab').constant('config', Object.assign({}, config, window.dockerConfig));