// import * as Phaser from 'phaser';

export default ShockwaveController;

declare namespace ShockwaveController {
    interface IConfig {
        center?: {
            x?: number,
            y?: number,
        }

        waveRadius?: number,
        waveWidth?: number,
        powBaseScale?: number,
        powExponent?: number,
    }
}

declare class ShockwaveController extends Phaser.Filters.Controller {
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: ShockwaveController.IConfig
    );

    resetFromJSON(config?: ShockwaveController.IConfig): this;

    setCenter(x?: number, y?: number): this;
    centerX: number;
    centerY: number;

    setWaveRadius(value: number): this;
    waveRadius: number;

    setWaveWidth(value: number): this;
    waveWidth: number;

    setPowBaseScale(value: number): this;
    powBaseScale: number;

    setPowExponent(value: number): this;
    powExponent: number;

}