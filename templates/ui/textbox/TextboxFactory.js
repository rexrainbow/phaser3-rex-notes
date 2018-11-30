import TextBox from './TextBox.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('textBox', function (config) {
    return new TextBox(this.scene, config);
});

SetValue(window, 'RexPlugins.UI.TextBox', TextBox);

export default TextBox;