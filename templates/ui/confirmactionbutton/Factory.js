import ConfirmActionButton from './ConfirmActionButton.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('confirmActionButton', function (config) {
    var gameObject = new ConfirmActionButton(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ConfirmActionButton', ConfirmActionButton);

export default ConfirmActionButton;