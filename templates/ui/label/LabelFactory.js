import Label from './Label.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('label', function (config) {
    return new Label(this.scene, config);
});

SetValue(window, 'RexPlugins.UI.Label', Label);

export default Label;