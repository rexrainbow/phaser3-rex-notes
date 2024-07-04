import NameInputDialog from './NameInputDialog.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('nameInputDialog', function (config, creators) {
    var gameObject = new NameInputDialog(this.scene, config, creators);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.NameInputDialog', NameInputDialog);

export default NameInputDialog;