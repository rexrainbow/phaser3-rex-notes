import FixWidthSizer from './FixWidthSizer.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('sizer', function (x, y, minWidth, minHeight, config) {
    return new FixWidthSizer(this.scene, x, y, minWidth, minHeight, config);
});

SetValue(window, 'RexPlugins.UI.FixWidthSizer', FixWidthSizer);

export default FixWidthSizer;