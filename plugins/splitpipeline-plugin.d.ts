import * as Phaser from 'phaser';
import SplitPostFxPipeline from './splitpipeline';

interface IConfig {
    x?: number, y?: number,

    width?: number, height?: number,
    left?: number, right?: number, top?: number, bottom?: number,

    shiftEnable?: boolean,

    name?: string
}

export default class SplitPipelinePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: IConfig
    ): SplitPostFxPipeline;

    remove(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): this;

    get(
        gameObject: Phaser.GameObjects.GameObject,
        name?: string
    ): SplitPostFxPipeline | SplitPostFxPipeline[];
}