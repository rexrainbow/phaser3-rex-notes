import ConfirmDialog from './ConfirmDialog';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('confirmDialog', function(config?: any, creators?: any) {
    var gameObject = new ConfirmDialog(this.scene, config, creators);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ConfirmDialog', ConfirmDialog);

export default ConfirmDialog;