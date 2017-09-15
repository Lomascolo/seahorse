/**
 * Copyright (c) 2015, CodiLime Inc.
 *
 * Owner: Grzegorz Swatowski
 */

'use strict';

var GraphNode = require('../../common-objects/common-graph-node.js');

function GraphNodeView() {
  return {
    restrict: 'E',
    scope: {
      node: '='
    },
    replace: true,
    templateUrl: 'app/experiments/experiment-editor/graph-panel/graph-panel-node.html',
    link: function (scope, element, attrs) {
      element.on('click', function () {
        console.log(element);
        scope.$emit(GraphNode.CLICK, {
          selectedNode: scope.node
        });
      });
    }
  };
}

exports.inject = function (module) {
  module.directive('graphNode', GraphNodeView);
};
