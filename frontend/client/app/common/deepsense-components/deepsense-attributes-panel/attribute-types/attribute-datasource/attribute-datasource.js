'use strict';

// Assets
import tpl from './attribute-datasource.html';

// App
import {datasourceModalMode} from 'COMMON/datasources/datasource-modal-mode.js';


/* @ngInject */
function AttributeDatasource(DatasourcesPanelService, datasourcesService, DatasourcesModalsService, AttributesPanelService) {
  return {
    restrict: 'E',
    templateUrl: tpl,
    replace: true,
    link: function (scope) {
      if (scope.parameter.value) {
        scope.error = '';
        scope.datasource = datasourcesService.datasources.find(datasource => datasource.id === scope.parameter.value);
        if (!scope.datasource) {
          scope.error = 'Could not find datasource with given ID.';
        }
      }

      scope.$watch(() => AttributesPanelService.getDisabledMode(), (newValue) => {
        scope.disabledMode = newValue;
      });

      scope.$watchGroup(
        [
          () => datasourcesService.datasources,
          () => scope.parameter.value
        ],
        (newValues) => {
          scope.datasource = newValues[0].find(
            (datasource) => datasource.id === scope.parameter.value
          );
        },
        true
      );

      scope.typeIcon = {
        externalFile: 'sa-external-file',
        libraryFile: 'sa-library',
        hdfs: 'sa-hdfs',
        jdbc: 'sa-database',
        googleSpreadsheet: 'sa-google-spreadsheet'
      };

      scope.openDataSourcePanel = function openDataSourcePanel() {
        DatasourcesPanelService.setHandlerOnDatasourceSelect(setDatasource);
        if (scope.parameter.schema.type === 'datasourceIdForRead') {
          DatasourcesPanelService.openDatasourcesForReading();
        } else {
          DatasourcesPanelService.openDatasourcesForWriting();
        }
      };

      scope.clearDatasource = function clearDatasource() {
        scope.datasource = null;
        scope.parameter.value = null;
      };

      scope.editDatasource = function editDatasource() {
        openDatasource(datasourceModalMode.EDIT);
      };

      scope.viewDatasource = function viewDatasource() {
        openDatasource(datasourceModalMode.VIEW);
      };

      function openDatasource(mode) {
        DatasourcesModalsService.openModal(
          scope.datasource.params.datasourceType,
          mode,
          scope.datasource
        );
      }

      scope.isDataSourceEmpty = function isDataSourceEmpty() {
        return _.isEmpty(scope.datasource);
      };

      scope.isOwner = function isOwner() {
        return scope.datasource ? datasourcesService.isCurrentUserOwnerOfDatasource(scope.datasource) : false;
      };

      function setDatasource(datasource) {
        DatasourcesPanelService.closeDatasources();
        scope.datasource = angular.copy(datasource);
        scope.parameter.value = datasource.id;
      }
    }
  };
}

angular.module('deepsense.attributes-panel')
  .directive('attributeDatasource', AttributeDatasource);