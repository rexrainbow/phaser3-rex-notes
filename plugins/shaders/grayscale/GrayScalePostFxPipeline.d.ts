// import * as Phaser from 'phaser';

export default class GrayScalePostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    setIntensity(value: number): this;
    intensity: number;
}