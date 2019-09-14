import NinePatch from './NinePatch.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('ninePatch', function (x, y, width, height, key, columns, rows, config) {
    return new NinePatch(this.scene, x, y, width, height, key, columns, rows, config);
});

SetValue(window, 'RexPlugins.UI.NinePatch', NinePatch);

export default NinePatch;