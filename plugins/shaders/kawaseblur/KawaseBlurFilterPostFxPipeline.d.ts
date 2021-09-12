// import * as Phaser from 'phaser';

export default class KawaseBlurFilterPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    setBlur(value: number): this;
    blur: number;

    setPixelSize(width: number, height?: number): this;
    setPixelWidth(value: number): this;
    setPixelHeight(value: number): this;
    pixelWidth: number;
    pixelHeight: number;
}