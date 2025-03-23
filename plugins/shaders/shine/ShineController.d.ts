// import * as Phaser from 'phaser';
export default ShineController;

declare namespace ShineController {
    interface IConfig {
        speed?: number,
        lineWidth?: number,
        gradient?: number,
        reveal?: boolean,
    }
}

declare class ShineController extends Phaser.Filters.Controller {
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: ShineController.IConfig
    );

    resetFromJSON(config?: ShineController.IConfig): this;

    setSpeed(value: number): this;
    speed: number;

    setLineWidth(width: number): this;
    lineWidth: number;

    setGradient(gradient: number): this;
    gradient: number;

    setReveal(reveal: boolean): this;
    reveal: boolean;
}