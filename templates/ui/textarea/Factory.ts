import TextArea from './TextArea';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('textArea', function(config?: any) {
    var gameObject = new TextArea(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.TextArea', TextArea);

export default TextArea;