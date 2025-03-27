// import * as Phaser from 'phaser';
export default OutlineController;

declare namespace OutlineController {
    interface IConfig {
        thickness?: number,
        outlineColor?: number,
        quality?: number
    }
}

declare class OutlineController extends Phaser.Filters.Controller {
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: OutlineController.IConfig
    );

    setThickness(value: number): this;
    thickness: number;

    setOutlineColor(value: number | Phaser.Types.Display.ColorObject): this;
    outlineColor: Phaser.Display.Color;

    static setQuality(quality: number): void;
    static getQuality(): number;
}