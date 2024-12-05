// import * as Phaser from 'phaser';

export default ToonifyController;

declare namespace ToonifyController {
    interface IConfig {
        edgeThreshold?: number,
        hueLevels?: number,
        satLevels?: number,
        valLevels?: number,
        edgeColor?: number,
    }
}

declare class ToonifyController extends Phaser.Filters.Controller {
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: ToonifyController.IConfig
    );

    resetFromJSON(o?: ToonifyController.IConfig): this;

    setEdgeThreshold(value: number): this;
    edgeThreshold: number;

    setHueLevels(value: number): this;
    hueLevels: number;

    setSatLevels(value: number): this;
    satLevels: number;

    setValLevels(value: number): this;
    valLevels: number;

    setEdgeColor(value: number | Phaser.Types.Display.ColorObject): this;
    edgeColor: Phaser.Display.Color;
}