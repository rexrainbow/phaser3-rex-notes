// import * as Phaser from 'phaser';
export default CircleController;

declare namespace CircleController {
    interface IConfig {
        thickness?: number,
        scale?: number,
        feather?: number,
        color?: number,
        backgroundColor?: number, backgroundAlpha?: number
    }
}

declare class CircleController extends Phaser.Filters.Controller {
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: CircleController.IConfig
    );

    resetFromJSON(config?: CircleController.IConfig): this;

    setThickness(thickness: number): this;
    thickness: number;

    setScale(scale: number): this;
    scale: number;

    setFeather(feather: number): this;
    feather: number;

    setColor(color: number): this;
    color: number;

    setBackgroundColor(color: number): this;
    backgroundColor: number;

    setBackgroundAlpha(color: number): this;
    backgroundAlpha: number;
}