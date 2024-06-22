import ComponentBase from '../../utils/componentbase/ComponentBase';

declare namespace MouseWheelZoom {
    interface IConfig {
        camera?: string | number | Phaser.Cameras.Scene2D.Camera,

        enable?: boolean,
        minZoom?: number,
        maxZoom?: number,

        inputTarget?: Phaser.Scene | Phaser.GameObjects.GameObject,
    }
}

declare class MouseWheelZoom extends ComponentBase {
    constructor(
        scene: Phaser.Scene,
        config?: MouseWheelZoom.IConfig
    );

    setEnable(enable?: boolean): this;
    enable: boolean;

    setCamera(camera?: Phaser.Cameras.Scene2D.Camera): this;
    camera?: Phaser.Cameras.Scene2D.Camera

}

export default MouseWheelZoom;