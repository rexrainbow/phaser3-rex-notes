export default FishEyeController;

declare namespace FishEyeController {
    type ModeType = 0 | 1 | 'asin' | 'sin';

    interface IConfig {
        mode?: ModeType,
        center?: {
            x?: number, y?: number
        },
        radius?: number,
        intensity?: number,

    }
}

declare class FishEyeController extends Phaser.Filters.Controller {
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: FishEyeController.IConfig
    );

    resetFromJSON(o?: FishEyeController.IConfig): this;

    setFishEyeMode(mode: number | string): this;
    fishEyeMode: number;

    setCenter(x: number, y?: number): this;
    centerX: number;
    centerY: number;

    setRadius(value: number): this;
    radius: number;

    setIntensity(value: number): this;
    intensity: number;
}