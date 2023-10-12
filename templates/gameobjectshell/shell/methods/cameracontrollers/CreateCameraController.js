import CreateCursorAtBoundsCameraController from "./CreateCursorAtBoundsCameraController";

const GetValue = Phaser.Utils.Objects.GetValue;
const DefaultConfig = { type: 'cursorAtBounds' };

var CreateCameraController = function (config) {
    var cameraControllerConfig = GetValue(config, 'cameraController', DefaultConfig);

    switch (cameraControllerConfig.type) {
        case 'cursorAtBounds':
            CreateCursorAtBoundsCameraController.call(this, cameraControllerConfig);
            break;

        case 'joystick':
            break;
    }

}

export default CreateCameraController;