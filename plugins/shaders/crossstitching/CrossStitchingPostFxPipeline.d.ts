// import * as Phaser from 'phaser';

export default class CrossStitchingPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    setStitchingWidth(value: number): this;
    stitchingWidth: number;
    setStitchingHeight(value: number): this;
    setStitchingSize(width: number, height?: number): this;
    stitchingHeight: number;

    setBrightness(value: number): this;
    brightness: number;
}