'use strict';

/* beautify preserve:start */
import { GraphPanelRendererBase } from './../graph-panel/graph-panel-renderer/graph-panel-renderer-base.js';
/* beautify preserve:end */

/* @ngInject */
function FlowChartBoxController($rootScope, $scope, $element, $document, GraphPanelRendererService, Edge, GraphNode,
  WorkflowService) {
  let nodeDimensions = {};

  this.getNodeDimensions = function getNodeDimensions() {
    let $node = $('[id^="node-"]:first', $element);

    nodeDimensions.width = $node.outerWidth(true);
    nodeDimensions.height = $node.outerHeight(true);

    return nodeDimensions;
  };

  this.isRootWorkflow = function isTopLevelWorkflow() {
    return WorkflowService.getRootWorkflow() === this.workflow;
  };

  $scope.$on('ZOOM.ZOOM_PERFORMED', (_, data) => {
    GraphPanelRendererService.setZoom(data.zoomRatio);
  });

  $scope.$on('FIT.FIT_PERFORMED', (_, data) => {
    GraphPanelRendererService.setZoom(data.zoomRatio);
  });

  $scope.$on('Drop.EXACT', (event, dropEvent, droppedElement, droppedElementType) => {
    if (droppedElementType === 'graphNode') {
      let data = {
        dropEvent: dropEvent,
        elementId: dropEvent.dataTransfer.getData('elementId'),
        target: $($element)
          .find('.flowchart-paint-area')[0]
      };

      $scope.$emit('FlowChartBox.ELEMENT_DROPPED', data);
    }
  });

  // Those are global. It is assumed that there is only one flowchart in application.
  $document.on('mousedown', () => GraphPanelRendererService.disablePortHighlightings(this.workflow));
  $rootScope.$on('FlowChartBox.ELEMENT_DROPPED', () => GraphPanelRendererService.disablePortHighlightings(this.workflow));
  $rootScope.$on('Keyboard.KEY_PRESSED_DEL', () => GraphPanelRendererService.disablePortHighlightings(this.workflow));
  $rootScope.$on(Edge.CREATE, () => GraphPanelRendererService.disablePortHighlightings(this.workflow));
  $rootScope.$on(Edge.REMOVE, () => GraphPanelRendererService.disablePortHighlightings(this.workflow));
  $rootScope.$on(GraphNode.MOUSEDOWN, () => GraphPanelRendererService.disablePortHighlightings(this.workflow));
  jsPlumb.bind('connectionDragStop', () => GraphPanelRendererService.disablePortHighlightings(this.workflow));

}

/* @ngInject */
function FlowChartBox(GraphPanelRendererService) {
  return {
    restrict: 'E',
    controller: FlowChartBoxController,
    controllerAs: 'flowChartBoxCtrl',
    bindToController: true,
    replace: true,
    scope: {
      'selectedNode': '=',
      'workflow': '=',
      'nodes': '=',
      'isRunning': '=',
      'zoomId': '@'
    },
    templateUrl: 'app/workflows/graph-panel/graph-panel-flowchart.html',
    link: (scope, element) => {
      element.on('click', (event) => {
        if (event.target.classList.contains('flowchart-paint-area')) {
          scope.$emit('AttributePanel.UNSELECT_NODE');
        }
      });

      scope.$watch('flowChartBoxCtrl.isRunning', function(newValue) {
        scope.$evalAsync(() => {
          let newRenderMode = newValue ?
            GraphPanelRendererBase.RUNNING_RENDER_MODE :
            GraphPanelRendererBase.EDITOR_RENDER_MODE;
          GraphPanelRendererService.setRenderMode(newRenderMode);
          GraphPanelRendererService.rerender(scope.flowChartBoxCtrl.workflow);
        });
      });

      // Focus is not working properly on elements inside flowchart box.
      // It might be caused by some libraries taking over mouse event and calling preventDefault
      // This click handler manually sets focus on flowchart if anything inside it is clicked.
      $('.flowchart-box').click(function() {
        $('.flowchart-box').focus();
      });

    }
  };
}

exports.inject = function(module) {
  module.directive('flowChartBox', FlowChartBox);
};
