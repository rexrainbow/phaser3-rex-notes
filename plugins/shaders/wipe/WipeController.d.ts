// import * as Phaser from 'phaser';
export default WipeController;

declare namespace WipeController {
    interface IConfig {
        progress?: number,
        wipeWidth?: number,
        direction?: 0 | 1,
        axis?: 0 | 1,

        reveal?: boolean,
        wipe?: boolean,
    }
}

declare class WipeController extends Phaser.Filters.Controller {
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: WipeController.IConfig
    );

    resetFromJSON(config?: WipeController.IConfig): this;

    setProgress(value: number): this;
    progress: number;

    setWipeWidth(width: number): this;
    wipeWidth: number;

    setDirection(value: 0 | 1): this;
    direction: 0 | 1;

    setAxis(value: 0 | 1): this;
    axis: 0 | 1;
}