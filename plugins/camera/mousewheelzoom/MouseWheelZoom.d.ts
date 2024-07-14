import ComponentBase from '../../utils/componentbase/ComponentBase';

declare namespace MouseWheelZoom {
    interface IConfig {
        camera?: string | number | Phaser.Cameras.Scene2D.Camera,

        zoomStep?: number,
        easeDuration?: number,

        minZoom?: number,
        maxZoom?: number,

        enable?: boolean,
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

    resetZoomLevel(): this;

    setMinZoom(value?: number): this;
    minZoom: number;

    setMaxZoom(value?: number): this;
    maxZoom: number;

}

export default MouseWheelZoom;