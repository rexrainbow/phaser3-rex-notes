import PanScrollPinchZoom from './PanScrollPinchZoom.js';
import BoundsScroll from './BoundsScroll.js';
import MouseWheelZoom from './MouseWheelZoom.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateCameraController = function (config) {
    var cameraControllerConfig = GetValue(config, 'camera');
    var panScrollEnable = GetValue(cameraControllerConfig, 'pan-scroll', true);
    var pinchZoomEnable = GetValue(cameraControllerConfig, 'pinch-zoom', true);
    var boundsScrollEnable = GetValue(cameraControllerConfig, 'bounds-scroll', true);
    var mouseWheelZoomEnable = GetValue(cameraControllerConfig, 'mouse-wheel-zoom', true);

    if (panScrollEnable || pinchZoomEnable) {
        PanScrollPinchZoom.call(this, panScrollEnable, pinchZoomEnable)
    }

    if (boundsScrollEnable) {
        BoundsScroll.call(this);
    }

    if (mouseWheelZoomEnable) {
        MouseWheelZoom.call(this);
    }
}

export default CreateCameraController;