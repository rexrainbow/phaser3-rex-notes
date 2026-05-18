import ConfirmActionButton from './ConfirmActionButton';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('confirmActionButton', function(config?: any) {
    var gameObject = new ConfirmActionButton(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ConfirmActionButton', ConfirmActionButton);

export default ConfirmActionButton;