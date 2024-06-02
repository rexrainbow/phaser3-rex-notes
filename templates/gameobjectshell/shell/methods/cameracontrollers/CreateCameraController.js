import PanScrollPinchZoom from './PanScrollPinchZoom.js';
import BoundsScroll from './BoundsScroll.js';
import MouseWheelZoom from './MouseWheelZoom.js';
import { GOCamera } from '../Layers.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateCameraController = function (config) {
    var cameraControllerConfig = GetValue(config, 'camera');
    var panScrollEnable = GetValue(cameraControllerConfig, 'pan-scroll', true);
    var pinchZoomEnable = GetValue(cameraControllerConfig, 'pinch-zoom', true);
    var boundsScrollEnable = GetValue(cameraControllerConfig, 'bounds-scroll', true);
    var mouseWheelZoomEnable = GetValue(cameraControllerConfig, 'mouse-wheel-zoom', true);

    var camera = this.scene.cameras.getCamera(GOCamera);

    if (panScrollEnable || pinchZoomEnable) {
        PanScrollPinchZoom.call(this, camera, panScrollEnable, pinchZoomEnable)
    }

    if (boundsScrollEnable) {
        BoundsScroll.call(this, camera);
    }

    if (mouseWheelZoomEnable) {
        MouseWheelZoom.call(this, camera);
    }
}

export default CreateCameraController;