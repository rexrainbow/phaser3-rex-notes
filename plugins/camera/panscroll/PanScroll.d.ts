import ComponentBase from '../../utils/componentbase/ComponentBase';

declare namespace PanScroll {
    interface IConfig {
        camera?: string | number | Phaser.Cameras.Scene2D.Camera,

        enable?: boolean,

        inputTarget?: Phaser.Scene | Phaser.GameObjects.GameObject,
    }
}

declare class PanScroll extends ComponentBase {
    constructor(
        scene: Phaser.Scene,
        config?: PanScroll.IConfig
    );

    setEnable(enable?: boolean): this;
    enable: boolean;

    setCamera(camera?: Phaser.Cameras.Scene2D.Camera): this;
    camera?: Phaser.Cameras.Scene2D.Camera

}

export default PanScroll;