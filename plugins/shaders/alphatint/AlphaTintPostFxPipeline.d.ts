// import * as Phaser from 'phaser';

export default AlphaTintPostFxPipeline;

declare namespace AlphaTintPostFxPipeline {
    interface IConfig {
        alpha?: number,
        tint?: number,
    }
}

declare class AlphaTintPostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    resetFromJSON(o?: AlphaTintPostFxPipeline.IConfig): this;

    setAlpha(value: number): this;
    alpha: number;

    setTint(value: number): this;
    clearTint(): this;
    tint: number;

    setTintFill(tintFill: boolean): this;
    tintFill: boolean;
}