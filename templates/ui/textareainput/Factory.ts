import TextAreaInput from './TextAreaInput';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('textAreaInput', function(config?: any) {
    var gameObject = new TextAreaInput(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.TextAreaInput', TextAreaInput);

export default TextAreaInput;