import ComponentBase from '../../utils/componentbase/ComponentBase';

declare namespace PinchController {
    interface IConfig {
        camera?: string | number | Phaser.Cameras.Scene2D.Camera,

        'pan-scroll'?: boolean,
        'pinch-zoom'?: boolean,

        inputTarget?: Phaser.Scene | Phaser.GameObjects.GameObject,
    }
}

declare class PinchController extends ComponentBase {
    constructor(
        scene: Phaser.Scene,
        config?: PinchController.IConfig
    );

    setPanScrollEnable(enable?: boolean): this;
    panScrollEnable: boolean;

    setPinchZoomEnable(enable?: boolean): this;
    pinchZoomEnable: boolean;

    setCamera(camera?: Phaser.Cameras.Scene2D.Camera): this;
    camera?: Phaser.Cameras.Scene2D.Camera

}

export default PinchController;