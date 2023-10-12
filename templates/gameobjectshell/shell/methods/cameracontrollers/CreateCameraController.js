import CreatePanPinchCameraController from './CreatePanPinchCameraController.js';
import CreateCursorAtBoundsCameraController from './CreateCursorAtBoundsCameraController.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const DefaultConfig = { type: 'pan-pinch' };

var CreateCameraController = function (config) {
    var cameraControllerConfig = GetValue(config, 'cameraController', DefaultConfig);

    switch (cameraControllerConfig.type) {
        case 'pan-pinch':
            CreatePanPinchCameraController.call(this, cameraControllerConfig);
            break;

        case 'cursorAtBounds':
            CreateCursorAtBoundsCameraController.call(this, cameraControllerConfig);
            break;
    }

}

export default CreateCameraController;