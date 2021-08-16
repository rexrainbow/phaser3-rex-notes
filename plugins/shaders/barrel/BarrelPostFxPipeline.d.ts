export default class BarrelPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
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