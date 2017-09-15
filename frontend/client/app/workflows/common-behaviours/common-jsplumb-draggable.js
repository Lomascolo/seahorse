'use strict';

import jsPlumb from 'jsplumb';

/* @ngInject */
function DraggableDirective($rootScope, GraphNode) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var reInitThisNodePosition = function reInitThisNodePosition() {
        if (scope.node) {
          scope.node.x = parseInt(element.css('left'), 10);
          scope.node.y = parseInt(element.css('top'), 10);
        }
      };

      jsPlumb.draggable(element, {
        containment: 'parent',
        stop: () => {
          reInitThisNodePosition();
          $rootScope.$broadcast(GraphNode.MOVE);
        }
      });

      scope.$on('MultipleSelection.STOP_DRAG', reInitThisNodePosition);
    }
  };
}

exports.inject = function(module) {
  module.directive('jsplumbDraggable', DraggableDirective);
};