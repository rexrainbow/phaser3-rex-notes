import TextBox from './TextBox';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('textBox', function(config?: any) {
    var gameObject = new TextBox(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.TextBox', TextBox);

export default TextBox;