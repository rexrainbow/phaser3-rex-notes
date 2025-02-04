// import * as Phaser from 'phaser';

export default ColorReplaceController;

declare namespace ColorReplaceController {
    interface IConfig {
        originalColor?: number,
        newColor?: number,
        epsilon?: number,
    }
}

declare class ColorReplaceController extends Phaser.Filters.Controller {
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: ColorReplaceController.IConfig
    );

    resetFromJSON(o?: ColorReplaceController.IConfig): this;

    setEpsilon(value: number): this;
    epsilon: number;

    setOriginalColor(value: number | Phaser.Types.Display.ColorObject): this;
    originalColor: Phaser.Display.Color;

    setNewColor(value: number | Phaser.Types.Display.ColorObject): this;
    newColor: Phaser.Display.Color;
}