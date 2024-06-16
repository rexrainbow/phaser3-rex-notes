import ComponentBase from '../../utils/componentbase/ComponentBase';
import PinchController from '../pinchcontroller/PinchController';
import BoundsWheelController from '../boundswheelcontroller/BoundsWheelController';

declare namespace ControllerPack {
    interface IConfig extends PinchController.IConfig, BoundsWheelController.IConfig {
        enable?: boolean,
    }
}

declare class ControllerPack extends ComponentBase {
    constructor(
        scene: Phaser.Scene,
        config?: ControllerPack.IConfig
    );

    setEnable(enable?: boolean): this;
    toggleEnable(): this;
    enable: boolean;

    setCamera(camera?: Phaser.Cameras.Scene2D.Camera): this;
    camera?: Phaser.Cameras.Scene2D.Camera

    setPanScrollEnable(enable?: boolean): this;
    panScrollEnable: boolean;

    setPinchZoomEnable(enable?: boolean): this;
    pinchZoomEnable: boolean;

    setBoundsScrollEnable(enable?: boolean): this;
    boundsScrollEnable: boolean;

    setMouseWheelZoomEnable(enable?: boolean): this;
    mouseWheelZoomEnable: boolean;

}

export default ControllerPack;