// import * as Phaser from 'phaser';

export default class WarpPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    setFrequence(x: number, y?: number): this;
    setFrequenceX(value: number): this;
    setFrequenceY(value: number): this;
    frequenceX: number;
    frequenceY: number;

    setAmplitude(x: number, y?: number): this;
    setAmplitudeX(value: number): this;
    setAmplitudeY(value: number): this;
    amplitudeX: number;
    amplitudeY: number;

    setProgress(value: number): this;
    progress: number;

    setProgressFactor(x: number, y?: number): this;
    setProgressFactorX(value: number): this;
    setProgressFactorY(value: number): this;
    progressFactorX: number;
    progressFactorY: number;
}