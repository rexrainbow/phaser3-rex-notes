import Dialog from './Dialog.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('dialog', function (config) {
    return new Dialog(this.scene, config);
});

SetValue(window, 'RexPlugins.UI.Dialog', Dialog);

export default Dialog;