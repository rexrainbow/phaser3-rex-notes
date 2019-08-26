import GridSizer from './GridSizer.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('gridSizer', function (x, y, minWidth, minHeight, columnCount, rowCount, columnProportions, rowProportion) {
    var gameObject = new GridSizer(this.scene, x, y, minWidth, minHeight, columnCount, rowCount, columnProportions, rowProportion);
    this.scene.add.existing(gameObject); // It won't be added to display list, neither update list
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.GridSizer', GridSizer);

export default GridSizer;