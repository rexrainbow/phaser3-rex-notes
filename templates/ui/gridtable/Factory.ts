import GridTable from './GridTable';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('gridTable', function(config?: any) {
    var gameObject = new GridTable(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.GridTable', GridTable);

export default GridTable;