// import * as Phaser from 'phaser';

export default class InversePostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    setIntensity(value: number): this;
    intensity: number;
}