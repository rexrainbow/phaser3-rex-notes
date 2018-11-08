import TabsTable from './TabsTable.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from 'rexPlugins/utils/object/SetValue.js';

ObjectFactory.register('tabsTable', function (config) {
    return new TabsTable(this.scene, config);
});

SetValue(window, 'RexPlugins.UI.TabsTable', TabsTable);

export default TabsTable;