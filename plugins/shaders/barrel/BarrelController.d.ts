export default BarrelContrtoller;

declare namespace BarrelContrtoller {
    interface IConfig {
        shrink?: boolean,
        center?: {
            x?: number, y?: number
        },
        radius?: number,
        power?: number,
        intensity?: number,
    }
}

declare class BarrelContrtoller extends Phaser.Filters.Controller {
    constructor(
        camera: Phaser.Cameras.Scene2D.BaseCamera,
        config?: BarrelContrtoller.IConfig
    );

    resetFromJSON(o?: BarrelContrtoller.IConfig): this;

    setShrinkMode(mode?: boolean): this;
    shrinkMode: boolean;

    setCenter(x: number, y?: number): this;
    centerX: number;
    centerY: number;

    setRadius(value: number): this;
    radius: number;

    setPower(power: number): this;
    power: this;

    setIntensity(value: number): this;
    intensity: number;
}