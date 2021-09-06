// import * as Phaser from 'phaser';

export default class GlowFilterPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    setOuterStrength(value: number): this;
    outerStrength: number;

    setInnerStrength(value: number): this;
    innerStrength: number;

    setGlowColor(value: number | Phaser.Types.Display.ColorObject): this;
    glowColor: Phaser.Display.Color;

    static setQuality(quality: number): void;
    static getQuality(): number;

    static setDistance(distance: number): void;
    static getDistance(): number;
}