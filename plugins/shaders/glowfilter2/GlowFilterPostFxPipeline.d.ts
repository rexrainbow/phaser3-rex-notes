// import * as Phaser from 'phaser';

export default class GlowFilterPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    setIntensity(value: number): this;
    intensity: number;
}