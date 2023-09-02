import TransformController from './TransformController.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('transformController', function (config) {
    var gameObject = new TransformController(this.scene, config);
    this.scene.add.existing(gameObject);
    return gameObject;
});

SetValue(window, 'RexPlugins.GameObjectShell.TransformController', TransformController);

export default TransformController;