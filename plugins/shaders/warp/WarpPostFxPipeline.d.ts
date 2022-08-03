// import * as Phaser from 'phaser';

export default class WarpPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    setFrequency(width: number, height?: number): this;
    setFrequencyX(value: number): this;
    setFrequencyY(value: number): this;
    frequencyX: number;
    frequencyY: number;
    frequency: number;

    setAmplitude(x: number, y?: number): this;
    setAmplitudeX(value: number): this;
    setAmplitudeY(value: number): this;
    amplitudeX: number;
    amplitudeY: number;
    amplitude: number;

    setProgressX(value: number): this;
    setProgressY(value: number): this;
    setProgress(x: number, y?: number): this;
    progressX: number;
    progressY: number;
    progress: number;
}