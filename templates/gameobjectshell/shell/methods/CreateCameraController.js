import CameraController from '../../cameracontroller/CameraController.js'
import { GOCamera } from './Layers.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateCameraController = function (config) {
    var camera = this.scene.cameras.getCamera(GOCamera);

    var cameraControllerConfig = GetValue(config, 'camera');
    if (cameraControllerConfig === undefined) {
        cameraControllerConfig = {};
    }

    // For all controllers
    cameraControllerConfig.camera = camera; 

    // For PinchController
    cameraControllerConfig.inputTarget = (this.background) ? this.background : this.scene;

    var controller = new CameraController(this.scene, cameraControllerConfig);

    this.cameraController = controller;

    this.once('destroy', function () {
        this.cameraController.destroy();
        this.cameraController = undefined;
    }, this);

    return controller;
}

export default CreateCameraController;