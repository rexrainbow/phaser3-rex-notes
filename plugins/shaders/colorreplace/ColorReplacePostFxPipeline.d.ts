// import * as Phaser from 'phaser';

export default class ColorReplacePostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    setEpsilon(value: number): this;
    epsilon: number;

    setOriginalColor(value: number | Phaser.Types.Display.ColorObject): this;
    originalColor: Phaser.Display.Color;

    setNewColor(value: number | Phaser.Types.Display.ColorObject): this;
    newColor: Phaser.Display.Color;
}