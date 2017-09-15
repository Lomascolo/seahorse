'use strict';

let GenericParameter = require('./common-generic-parameter.js');

function CodeSnippetParameter(options) {
  this.name = options.name;
  this.initValue(options.value, options.schema, true);
  this.schema = options.schema;
}

CodeSnippetParameter.prototype = new GenericParameter();
CodeSnippetParameter.prototype.constructor = GenericParameter;

CodeSnippetParameter.prototype.serialize = function () {
  return this.value;
};

module.exports = CodeSnippetParameter;