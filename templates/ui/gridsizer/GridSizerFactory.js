import GridSizer from './GridSizer.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('gridSizer', function (x, y, minWidth, minHeight, columnCount, rowCount) {
    return this.scene.sys.displayList.add(new GridSizer(this.scene, x, y, minWidth, minHeight, columnCount, rowCount));
});

SetValue(window, 'RexPlugins.UI.GridSizer', GridSizer);

export default GridSizer;