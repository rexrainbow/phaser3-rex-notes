import Toast from './Toast.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('toast', function (config) {
    var gameObject = new Toast(this.scene, config);
    this.displayList.add(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.Toast', Toast);

export default Toast;