import ComponentBase from '../../utils/componentbase/ComponentBase';

declare namespace BoundsWheelController {
    interface IConfig {
        camera?: Phaser.Cameras.Scene2D.Camera,

        'bounds-scroll'?: boolean,
        'mouse-wheel-zoom'?: boolean,
    }
}

declare class BoundsWheelController extends ComponentBase {
    constructor(
        scene: Phaser.Scene,
        config?: BoundsWheelController.IConfig
    );

    setBoundsScrollEnable(enable?: boolean): this;
    boundsScrollEnable: boolean;

    setMouseWheelZoomEnable(enable?: boolean): this;
    mouseWheelZoomEnable: boolean;

    setCamera(camera?: Phaser.Cameras.Scene2D.Camera): this;
    camera?: Phaser.Cameras.Scene2D.Camera

}

export default BoundsWheelController;