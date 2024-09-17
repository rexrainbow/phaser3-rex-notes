import { Cameras } from "phaser";
const CameraClass = Cameras.Scene2D.BaseCamera;

var IsCameraObject = function (object) {
    return (object instanceof CameraClass);
}

export default IsCameraObject;