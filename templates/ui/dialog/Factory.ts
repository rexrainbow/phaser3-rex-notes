import Dialog from './Dialog';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('dialog', function(config?: any) {
    var gameObject = new Dialog(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Dialog', Dialog);

export default Dialog;