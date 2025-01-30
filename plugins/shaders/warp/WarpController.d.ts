// import * as Phaser from 'phaser';
export default WarpController;

declare namespace WarpController {
    interface IConfig {
        frequencyX?: number, frequencyY?: number,
        frequency?: number,

        amplitudeX?: number, amplitudeY?: number,
        amplitude?: number,

        speedX?: number, speedY?: number,
        speed?: number,
        speedEnable?: boolean
    }
}

declare class WarpController extends Phaser.Filters.Controller {
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: WarpController.IConfig
    );

    resetFromJSON(config?: WarpController.IConfig): this;

    setFrequency(width: number, height?: number): this;
    setFrequencyX(value: number): this;
    setFrequencyY(value: number): this;
    frequencyX: number;
    frequencyY: number;
    frequency: number;

    setAmplitude(x: number, y?: number): this;
    setAmplitudeX(value: number): this;
    setAmplitudeY(value: number): this;
    amplitudeX: number;
    amplitudeY: number;
    amplitude: number;

    setSpeedX(value: number): this;
    setSpeedY(value: number): this;
    setSpeed(x: number, y?: number): this;
    speedX: number;
    speedY: number;
    speed: Phaser.Math.Vector2;
}