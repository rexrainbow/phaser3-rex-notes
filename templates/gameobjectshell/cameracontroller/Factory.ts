import CameraController from './CameraController';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../../plugins/utils/object/SetValue';

ObjectFactory.register('cameraController', function(config?: any) {
    var controller = new CameraController(this.scene, config);
    return controller;
});

SetValue(window, 'RexPlugins.GameObjectShell.CameraController', CameraController);

export default CameraController;