// import * as Phaser from 'phaser';

export default class WarpPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    setPixelSize(width: number, height?: number): this;
    setPixelWidth(value: number): this;
    setPixelHeight(value: number): this;
    pixelWidth: number;
    pixelHeight: number;
    pixelSize: number;

    setRadius(x: number, y?: number): this;
    setRadiusX(value: number): this;
    setRadiusY(value: number): this;
    radiusX: number;
    radiusY: number;
    radius: number;

    setProgressX(value: number): this;
    setProgressY(value: number): this;
    setProgress(x: number, y?: number): this;
    progressX: number;
    progressY: number;
    progress: number;
}