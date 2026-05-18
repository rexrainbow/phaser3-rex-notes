import ToastQueue from './ToastQueue';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('toastQueue', function(config?: any) {
    var gameObject = new ToastQueue(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.UI.ToastQueue', ToastQueue);

export default ToastQueue;