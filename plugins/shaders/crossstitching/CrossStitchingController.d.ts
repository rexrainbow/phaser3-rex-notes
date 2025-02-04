// import * as Phaser from 'phaser';
export default CrossStitchingController;

declare namespace CrossStitchingController {
    interface IConfig {
        stitchingWidth?: number,
        stitchingHeight?: number,
        brightness?: number,
    }
}

declare class CrossStitchingController extends Phaser.Filters.Controller {
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: CrossStitchingController.IConfig
    );

    resetFromJSON(o?: CrossStitchingController.IConfig): this;

    setStitchingWidth(value: number): this;
    stitchingWidth: number;
    setStitchingHeight(value: number): this;
    setStitchingSize(width: number, height?: number): this;
    stitchingHeight: number;

    setBrightness(value: number): this;
    brightness: number;
}