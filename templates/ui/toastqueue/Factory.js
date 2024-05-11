import ToastQueue from './ToastQueue.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('toastQueue', function (config) {
    var gameObject = new ToastQueue(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ToastQueue', ToastQueue);

export default ToastQueue;