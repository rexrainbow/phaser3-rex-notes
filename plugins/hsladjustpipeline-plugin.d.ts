import * as Phaser from 'phaser';
import HslAdjustPostFxPipeline from './hsladjustpipeline';

interface IConfig {
    intensity?: number,

    name?: string,
}

export default class HslAdjustPipelinePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: IConfig
    ): HslAdjustPostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): HslAdjustPostFxPipeline | HslAdjustPostFxPipeline[];
}