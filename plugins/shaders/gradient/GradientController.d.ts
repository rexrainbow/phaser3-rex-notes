// import * as Phaser from 'phaser';
export default GradientController;

declare namespace GradientController {
    interface IConfig {
        alpha?: number,
        fromX?: number, fromY?: number,
        toX?: number, toY?: number,
        color1?: number, color2?: number,
        size?: number
    }
}

declare class GradientController extends Phaser.Filters.Controller {
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: GradientController.IConfig
    );

    resetFromJSON(config?: GradientController.IConfig): this;

    setAlpha(alpha?: number): this;
    alpha: number;

    setFromPosition(x: number, y: number): this;
    fromX: number;
    fromY: number;

    setToPosition(x: number, y: number): this;
    toX: number;
    toY: number;

    setColor1(color1: number): this;
    color1: number;

    setColor2(color2: number): this;
    color2: number;

    setSize(size: number): this;
    size: number;
}