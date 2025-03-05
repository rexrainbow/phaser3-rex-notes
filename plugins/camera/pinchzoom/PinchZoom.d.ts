import ComponentBase from '../../utils/componentbase/ComponentBase';

declare namespace PinchZoom {
    interface IConfig {
        camera?: string | number | Phaser.Cameras.Scene2D.Camera,

        enable?: boolean,
        minZoom?: number,
        maxZoom?: number,

        focusEnable?: boolean,

        inputTarget?: Phaser.Scene | Phaser.GameObjects.GameObject,
    }
}

declare class PinchZoom extends ComponentBase {
    constructor(
        scene: Phaser.Scene,
        config?: PinchZoom.IConfig
    );

    setEnable(enable?: boolean): this;
    enable: boolean;

    setCamera(camera?: Phaser.Cameras.Scene2D.Camera): this;
    camera?: Phaser.Cameras.Scene2D.Camera

    readonly isPinching: boolean;
}

export default PinchZoom;