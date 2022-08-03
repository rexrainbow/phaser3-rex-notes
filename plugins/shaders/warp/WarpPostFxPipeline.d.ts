// import * as Phaser from 'phaser';

export default class WarpPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    setPixelSize(width: number, height?: number): this;
    setPixelWidth(value: number): this;
    setPixelHeight(value: number): this;
    pixelWidth: number;
    pixelHeight: number;

    setRadius(x: number, y?: number): this;
    setRadiusX(value: number): this;
    setRadiusY(value: number): this;
    radiusX: number;
    radiusY: number;

    setProgress(value: number): this;
    progress: number;

    setProgressFactor(x: number, y?: number): this;
    setProgressFactorX(value: number): this;
    setProgressFactorY(value: number): this;
    progressFactorX: number;
    progressFactorY: number;
}