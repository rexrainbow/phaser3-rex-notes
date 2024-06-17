import ComponentBase from '../../utils/componentbase/ComponentBase';

declare namespace BoundsWheelController {
    interface IConfig {
        camera?: string | number | Phaser.Cameras.Scene2D.Camera,

        boundsScrollEnable?: boolean,
        mouseWheelZoomEnable?: boolean,
    }
}

declare class BoundsWheelController extends ComponentBase {
    constructor(
        scene: Phaser.Scene,
        config?: BoundsWheelController.IConfig
    );

    setCamera(camera?: Phaser.Cameras.Scene2D.Camera): this;
    camera?: Phaser.Cameras.Scene2D.Camera

    setBoundsScrollEnable(enable?: boolean): this;
    boundsScrollEnable: boolean;

    setMouseWheelZoomEnable(enable?: boolean): this;
    mouseWheelZoomEnable: boolean;

}

export default BoundsWheelController;