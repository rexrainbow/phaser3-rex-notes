import GridTable from './GridTable.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('gridTable', function (config) {
    return new GridTable(this.scene, config);
});

SetValue(window, 'RexPlugins.UI.GridTable', GridTable);

export default GridTable;