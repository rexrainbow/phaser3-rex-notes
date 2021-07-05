// import * as Phaser from 'phaser';
import GrayScalePostFxPipeline from './grayscalepipeline';

interface IConfig {
    intensity?: number,

    name?: string,
}

export default class GrayScalePipelinePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: IConfig
    ): GrayScalePostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): GrayScalePostFxPipeline | GrayScalePostFxPipeline[];
}