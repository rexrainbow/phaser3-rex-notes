import ComponentBase from '../../utils/componentbase/ComponentBase';

declare namespace BoundsScroll {
    interface IConfig {
        camera?: string | number | Phaser.Cameras.Scene2D.Camera,

        enable?: boolean,
    }
}

declare class BoundsScroll extends ComponentBase {
    constructor(
        scene: Phaser.Scene,
        config?: BoundsScroll.IConfig
    );

    setEnable(enable?: boolean): this;
    enable: boolean;

    setCamera(camera?: Phaser.Cameras.Scene2D.Camera): this;
    camera?: Phaser.Cameras.Scene2D.Camera

}

export default BoundsScroll;