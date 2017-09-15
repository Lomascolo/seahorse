'use strict';

// Assets
import footerTpl from './modal-footer/modal-footer.html';

// App
import {datasourceModalMode} from 'COMMON/datasources/datasource-modal-mode.js';


class DatasourceModal {
  constructor(
    $log,
    $uibModalInstance,
    datasourcesService,
    editedDatasource,
    mode
  ) {
    'ngInject';

    this.$log = $log;
    this.$uibModalInstance = $uibModalInstance;
    this.datasourcesService = datasourcesService;
    this.editedDatasource = angular.copy(editedDatasource);
    this.previewMode = mode === datasourceModalMode.VIEW;
    this.footerTpl = footerTpl;
  }


  isCsvSeparatorValid(fileParams) {
    if (fileParams.fileFormat !== 'csv') {
      return true;
    }

    const {separatorType, customSeparator} = fileParams.csvFileFormatParams;

    if (!separatorType) {
      return false;
    }

    return separatorType === 'custom' ? customSeparator !== '' : true;
  }


  doesNameExists() {
    if (this.editedDatasource && this.editedDatasource.params.name === this.datasourceParams.name) {
      return false;
    } else {
      return this.datasourcesService.isNameUsed(this.datasourceParams.name);
    }
  }


  canAddDatasource() {
    const nameIsNotEmpty = this.datasourceParams.name !== '';

    return nameIsNotEmpty && !this.doesNameExists();
  }


  cancel() {
    this.$uibModalInstance.dismiss();
  }


  ok() {
    if (this.originalDatasource) {
      const params = this.datasourceParams;
      const updatedDatasource = Object.assign({}, this.originalDatasource, params);

      this.datasourcesService.updateDatasource(updatedDatasource)
        .then((result) => {
          this.$log.info('BaseDatasourceModal updateDatasource result', result);
          this.$uibModalInstance.close();
        })
        .catch((error) => {
          this.$log.info('BaseDatasourceModal updateDatasource error ', error);
        });
    } else {
      this.datasourcesService.addDatasource(this.datasourceParams)
        .then((result) => {
          this.$log.info('BaseDatasourceModal addDatasource result ', result);
          this.$uibModalInstance.close();
        })
        .catch((error) => {
          this.$log.info('BaseDatasourceModal addDatasource error ', error);
        });
    }
  }

}

export default DatasourceModal;