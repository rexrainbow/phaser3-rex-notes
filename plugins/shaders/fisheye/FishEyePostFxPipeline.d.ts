export default class FishEyePostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
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