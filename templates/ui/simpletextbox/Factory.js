import SimpleTextBox from './SimpleTextBox.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('simpleTextBox', function (config) {
    var gameObject = new SimpleTextBox(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.SimpleTextBox', SimpleTextBox);

export default SimpleTextBox;