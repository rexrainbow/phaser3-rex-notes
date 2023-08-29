import TextAreaInput from './TextAreaInput.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('textAreaInput', function (config) {
    var gameObject = new TextAreaInput(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.TextAreaInput', TextAreaInput);

export default TextAreaInput;