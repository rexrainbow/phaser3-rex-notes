import NameInputDialog from './NameInputDialog';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('nameInputDialog', function(config?: any, creators?: any) {
    var gameObject = new NameInputDialog(this.scene, config, creators);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.NameInputDialog', NameInputDialog);

export default NameInputDialog;