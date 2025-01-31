// import * as Phaser from 'phaser';
export default HslAdjustController;

declare namespace HslAdjustController {
    interface IConfig {
        hueRotate?: number,
        satAdjust?: number,
        lumAdjust?: number
    }
}

declare class HslAdjustController extends Phaser.Filters.Controller {
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: HslAdjustController.IConfig
    );

    resetFromJSON(o?: HslAdjustController.IConfig): this;

    setHueRotate(value: number): this;
    hueRotate: number;

    setSatAdjust(value: number): this;
    satAdjust: number;

    setLumAdjust(value: number): this;
    lumAdjust: number;
}