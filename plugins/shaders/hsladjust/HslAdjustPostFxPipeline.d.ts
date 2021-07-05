// import * as Phaser from 'phaser';

export default class HslAdjustPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    setHueRotate(value: number): this;
    hueRotate: number;

    setSatAdjust(value: number): this;
    satAdjust: number;

    setLumAdjust(value: number): this;
    lumAdjust: number;
}