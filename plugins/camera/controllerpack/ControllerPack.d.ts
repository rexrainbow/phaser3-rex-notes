import ComponentBase from '../../utils/componentbase/ComponentBase';
import PinchZoom from '../pinchzoom/PinchZoom';
import PanScroll from '../panscroll/PanScroll';
import BoundsScroll from '../boundsscroll/BoundsScroll';
import MouseWheelZoom from '../mousewheelzoom/MouseWheelZoom';

declare namespace ControllerPack {
    interface IConfig extends PinchZoom.IConfig, PanScroll.IConfig, BoundsScroll.IConfig, MouseWheelZoom.IConfig {
        panScroll?: boolean,
        panScrollEnable?: boolean,

        pinchZoom?: boolean,
        pinchZoomEnable?: boolean,

        boundsScroll?: boolean,
        boundsScrollEnable?: boolean,

        mouseWheelZoom?: boolean,
        mouseWheelZoomEnable?: boolean,

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