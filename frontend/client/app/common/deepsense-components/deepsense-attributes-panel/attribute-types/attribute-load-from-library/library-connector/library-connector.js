'use strict';

import tpl from './library-connector.html';

const LIBRARY_MODE = 'read-file';

/* @ngInject */
function LibraryConnector() {
  return {
    restrict: 'E',
    templateUrl: tpl,
    replace: true,
    bindToController: {
      fileUri: '='
    },
    controllerAs: 'controller',
    controller: function ($scope, LibraryModalService, LibraryService) {
      const vm = this;

      vm.openLibrary = openLibrary;

      $scope.$watchGroup([() => vm.fileUri, () => LibraryService.getAll()], () => {
        const file = LibraryService.getFileByURI(vm.fileUri);
        vm.label = file ? file.name : 'Library';
      });

      function openLibrary() {
        LibraryModalService.openLibraryModal(LIBRARY_MODE)
          .then((result) => {
            if (result) {
              vm.fileUri = result.uri;
            }
          });
      }
    }
  };
}

angular.module('deepsense.attributes-panel')
  .directive('libraryConnector', LibraryConnector);