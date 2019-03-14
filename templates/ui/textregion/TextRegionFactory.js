import TextRegion from './TextRegion.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('textRegion', function (x, y, minWidth, minHeight, textGameObject, config) {
    return new TextRegion(this.scene, x, y, minWidth, minHeight, textGameObject, config);
});

SetValue(window, 'RexPlugins.UI.TextRegion', TextRegion);

export default TextRegion;