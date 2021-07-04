import * as Phaser from 'phaser';
import PixelationPostFxPipeline from './pixelationpipeline';

interface IConfig {
    pixelWidth?: number,
    pixelHeight?: number,

    name?: string,
}

export default class PixelationPipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: IConfig
    ): PixelationPostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): PixelationPostFxPipeline | PixelationPostFxPipeline[];
}