import FixWidthSizer from './FixWidthSizer.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('fixWidthSizer', function (x, y, minWidth, minHeight, orientation, expandChildren) {
    return new FixWidthSizer(this.scene, x, y, minWidth, minHeight, orientation, expandChildren);
});

SetValue(window, 'RexPlugins.UI.FixWidthSizer', FixWidthSizer);

export default FixWidthSizer;