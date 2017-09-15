'use strict';

let GenericParameter = require('./common-generic-parameter.js');

function BooleanParameter(options) {
  this.name = options.name;
  this.initValue(options.value, options.schema);
  this.schema = options.schema;
}

BooleanParameter.prototype = new GenericParameter();
BooleanParameter.prototype.constructor = GenericParameter;

BooleanParameter.prototype.serialize = function () {
  return this.value;
};

module.exports = BooleanParameter;