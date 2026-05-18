import SimpleTextBox from './SimpleTextBox';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('simpleTextBox', function(config?: any) {
    var gameObject = new SimpleTextBox(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.SimpleTextBox', SimpleTextBox);

export default SimpleTextBox;