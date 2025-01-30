// import * as Phaser from 'phaser';
export default SwirlController;

declare namespace SwirlController {
    interface IConfig {
        radius?: number,

        rotation?: number,
        angle?: number,

        center?: {
            x?: number,
            y?: number,
        }
    }
}

declare class SwirlController extends Phaser.Filters.Controller {
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: SwirlController.IConfig
    );

    resetFromJSON(config?: SwirlController.IConfig): this;

    setCenter(x: number, y?: number): this;
    centerX: number;
    centerY: number;

    setRotation(radians: number): this;
    rotation: number;
    setAngle(degrees: number): this;
    angle: number;

    setRadius(value: number): this;
    radius: number;
}