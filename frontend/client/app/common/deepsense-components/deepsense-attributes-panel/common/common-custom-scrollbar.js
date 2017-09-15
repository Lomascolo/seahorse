'use strict';

function CustomScrollBar() {
  return {
    restrict: 'A',
    link: (scope, element) => {
      jQuery(element).mCustomScrollbar({
        axis: 'y',
        theme: 'deepsense',
        scrollInertia: 300
      });
    }
  };
}

angular.module('deepsense.attributes-panel')
  .directive('customScrollBar', CustomScrollBar);