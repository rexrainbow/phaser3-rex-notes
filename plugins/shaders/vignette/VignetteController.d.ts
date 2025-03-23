// import * as Phaser from 'phaser';
export default VignetteController;

declare namespace VignetteController {
    interface IConfig {
        x?: number,
        y?: number,
        radius?: number,
        strength?: number,
    }
}

declare class VignetteController extends Phaser.Filters.Controller {
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: VignetteController.IConfig
    );

    resetFromJSON(config?: VignetteController.IConfig): this;

    setPosition(x: number, y: number): this;
    x: number;
    y: number;

    setRadius(radius: number): this;
    radius: number;

    setStrength(strength: number): this;
    strength: number;
}