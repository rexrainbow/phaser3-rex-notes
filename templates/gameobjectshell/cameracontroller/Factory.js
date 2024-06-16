import CameraController from './CameraController.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../../plugins/utils/object/SetValue.js';

ObjectFactory.register('cameraController', function (config) {
    var controller = new CameraController(this.scene, config);
    return controller;
});

SetValue(window, 'RexPlugins.GameObjectShell.CameraController', CameraController);

export default CameraController;