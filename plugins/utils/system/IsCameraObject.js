import { Cameras as PhaserCameras } from 'phaser';
const CameraClass = PhaserCameras.Scene2D.BaseCamera;

var IsCameraObject = function (object) {
    return (object instanceof CameraClass);
}

export default IsCameraObject;