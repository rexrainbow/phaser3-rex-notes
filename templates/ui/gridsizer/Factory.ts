import GridSizer from './GridSizer';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('gridSizer', function(x?: any, y?: any, minWidth?: any, minHeight?: any, columnCount?: any, rowCount?: any, columnProportions?: any, rowProportion?: any, config?: any) {
    var gameObject = new GridSizer(this.scene, x, y, minWidth, minHeight, columnCount, rowCount, columnProportions, rowProportion, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.GridSizer', GridSizer);

export default GridSizer;