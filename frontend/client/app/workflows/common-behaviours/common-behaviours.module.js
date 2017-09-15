'use strict';

exports.inject = function(module) {
  require('./common-jsplumb-draggable.js').inject(module);
  require('./common-draggable.js').inject(module);
  require('./common-droppable.js').inject(module);
  require('./common-drag-and-drop.service.js').inject(module);
  require('./common-keyboard.js').inject(module);
  require('./common-stick-onscroll.js').inject(module);
  require('./common-focused.js').inject(module);
  require('./common-flowchart-box-undraggable.js').inject(module);
  require('./common-context-menu-blocker.js').inject(module);
  require('./common-calculate-available-view-height.js').inject(module);
};