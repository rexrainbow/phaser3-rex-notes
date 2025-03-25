// import * as Phaser from 'phaser';
export default BloomController;

declare namespace BloomController {
    interface IConfig {
        steps?: number,
        offsetX?: number, offsetY?: number,
        blurStrength?: number,
        color?: number,
        strength?: number,
    }
}

declare class BloomController extends Phaser.Filters.ParallelFilters {
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: BloomController.IConfig
    );

    resetFromJSON(config?: BloomController.IConfig): this;

    setSteps(steps: number): this;
    steps: number;

    setOffset(x: number, y: number): this;
    offsetX: number;
    offsetY: number;

    setBlurStrength(blurStrength: number): this;
    blurStrength: number;

    setColor(color: number): this;
    color: number;

    setStrength(strength: number): this;
    strength: number;
}